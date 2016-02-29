'use strict';

var request = require('request');
var Q = require('q');


/**
 * Endpoints and options
 */
const BASE_URL = 'https://rink.hockeyapp.net/api/2/';
const GET_APPS_PATH = 'apps';
const GET_APP_VERSION_PATH = 'apps/{public_identifier}/app_versions';
const GET_ANDROID_APP_DOWNLOAD_PATH = 'apps/{public_identifier}/app_versions/{id}?format=apk';
const HOCKEY_APP_TOKEN_HEADER = 'X-HockeyAppToken';

/**
 * Default HockeyApp options
 * @type {{hockeyAppToken: string}}
 */
const DEFAULT_OPTIONS = {hockeyAppToken: ''};

/**
 * Initialize HockeyApp API Wrapper
 * @constructor
 */
function HockeyApp(options) {
    var initOptions = function (that, options) {
        if (typeof options === "string") {
            options = { hockeyAppToken : options };
        }

        this._options = extend(DEFAULT_OPTIONS, options);
    }

    this.createRequestOptions = function (relativePath, method) {
        method = method || 'GET';
        var options = {
            url: BASE_URL + relativePath,
            method: method,
            headers: {}
        };
        options.headers[HOCKEY_APP_TOKEN_HEADER] = that._options.hockeyAppToken;

        return options;
    };
    
    initOptions(this, options);
}

/**
 * Get all Apps
 * @returns http://support.hockeyapp.net/kb/api/api-apps#list-apps
 */
HockeyApp.prototype.getApps = function () {
    var deferred = Q.defer();

    if (!this._apps) {
        var options = this.createRequestOptions(GET_APPS_PATH);
        request(options, (function(that){ 
            return function (error, response, body) {
                that._apps = JSON.parse(body);
                deferred.resolve(that._apps);
            };
        })(this));
    } else {
        deferred.resolve(this._apps);
    }

    return deferred.promise;
};

/**
 * Get all Versions of an app
 * @param app: Response from HockeyApp.prototype.getApps
 * @returns http://support.hockeyapp.net/kb/api/api-versions#list-versions
 */
HockeyApp.prototype.getVersions = function (app) {
    var deferred = Q.defer();

    if (!this._versions) {
        this._versions = {};
    }

    if (!this._versions[app.public_identifier]) {
        var public_identifier = app.public_identifier;
        var options = this.createRequestOptions(GET_APP_VERSION_PATH.replace('{public_identifier}', public_identifier));
        request(options, (function(that) {
            return function (error, response, body) {
                that._versions[app.public_identifier] = JSON.parse(body);
                deferred.resolve(that._versions[app.public_identifier]);
            };
        })(this));
    } else {
        deferred.resolve(this._versions[app.public_identifier]);
    }

    return deferred.promise;
};

/**
 * Get latest version download link for Android app
 * @param app: Response from HockeyApp.prototype.getApps
 * @param version: Response from HockeyApp.prototype.getVersions
 * @returns Downloadable APK
 */
HockeyApp.prototype.getLatestAndroidVersionDownloadLink = function (app, version) {
    var public_identifier = app.public_identifier;
    var id = version.id;
    var downloadUrl = BASE_URL + GET_ANDROID_APP_DOWNLOAD_PATH
            .replace('{public_identifier}', public_identifier)
            .replace("{id}", id);
    return downloadUrl;
};

module.exports = {HockeyApp: HockeyApp, Utils: require('./utils.js')};