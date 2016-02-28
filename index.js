var request = require('request');
const Q = require('q');

const BASE_URL = 'https://rink.hockeyapp.net/api/2/';
const GET_APPS_PATH = 'apps';
const GET_APP_VERSION_PATH = 'apps/{public_identifier}/app_versions';
const GET_ANDROID_APP_DOWNLOAD_PATH = 'apps/{public_identifier}/app_versions/{id}?format=apk';

function HockeyApp() {
  var that = this;
  this.createRequestOptions = function(relativePath, method) {
    method = method || 'GET';
    return {
      url: BASE_URL + relativePath,
      path: '/api/2/' + relativePath,
      method: method,
      headers: {
        'X-HockeyAppToken': that.hockeyAppToken
      }
    };
  }
}

HockeyApp.prototype.init = function(hockeyAppToken) {
  this.hockeyAppToken = hockeyAppToken;
  return this;
};

HockeyApp.prototype.getApps = function() {
  var deferred = Q.defer();

  var options = this.createRequestOptions(GET_APPS_PATH);
  request(options, function(error, response, body) {
    deferred.resolve(JSON.parse(body));
  });

  return deferred.promise;
};

HockeyApp.prototype.getVersions = function(app) {
  var deferred = Q.defer();

  var public_identifier = app.public_identifier;
  var options = this.createRequestOptions(GET_APP_VERSION_PATH.replace('{public_identifier}', public_identifier));
  request(options, function(error, response, body) {
    deferred.resolve(JSON.parse(body));
  });

  return deferred.promise;
};

HockeyApp.prototype.getLatestAndroidVersionDownloadLink = function(app, version) {
  var public_identifier = app.public_identifier;
  var id = version.id;
  var downloadUrl = BASE_URL + GET_ANDROID_APP_DOWNLOAD_PATH
      .replace('{public_identifier}', public_identifier)
      .replace("{id}", id);
  return downloadUrl;
};

HockeyApp.getAppByIndex = function(appsResponse, index) {
  return appsResponse.apps[index];
};

HockeyApp.getAppByTitleMatch = function(appsResponse, match) {
  var apps = appsResponse.apps;

  for (var i = 0; i < apps.length; i++) {
    if (apps[i].title == match) {
      return apps[i];
    }
  }

  return null;
};

HockeyApp.getLatestVersion = function(versionResponse) {
  return versionResponse.app_versions[0];
};

module.exports = HockeyApp;