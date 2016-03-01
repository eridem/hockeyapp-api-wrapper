/// <reference path="../typings/main/ambient/request/request.d.ts" />
/// <reference path="../typings/main/ambient/q/q.d.ts" />
'use strict';
declare function require(name: string);

import request = require('request');
import Q = require('q');

export interface IOptions {
    hockeyAppToken: string;
}

export default class HockeyApp {
    public static get BASE_URL(): string { return 'https://rink.hockeyapp.net/api/2/'; }
    public static get GET_APPS_PATH(): string { return 'apps'; }
    public static get GET_APP_VERSION_PATH(): string { return 'apps/{public_identifier}/app_versions'; }
    public static get GET_ANDROID_APP_DOWNLOAD_PATH(): string { return 'apps/{public_identifier}/app_versions/{id}?format=apk'; }
    public static get HOCKEY_APP_TOKEN_HEADER(): string { return 'X-HockeyAppToken'; }

    private _options: IOptions;

    constructor(options: any) {
        if (typeof options === 'IOptions') {
            this.init(options);
        } else if (typeof options === 'string') {
            this.init({ hockeyAppToken: options });
        } else {
            throw ('"options" must be a "IOptions" or "string" object.');
        }
    }

    private get Options(): IOptions { return this._options; }
    private set Options(value: IOptions) { this._options = value; }

    private init(options: IOptions) {
        this.Options = options;
    }

    /**
        * Create request options for this API wrapper
        * @param urlPath API path
        * @param method GET by default
        */
    private createRequestOptions(urlPath: string, method?: string): any {
        method = method || 'GET';
        var requestOptions = {
            url: HockeyApp.BASE_URL + urlPath,
            method: method,
            headers: {}
        };
        requestOptions.headers[HockeyApp.HOCKEY_APP_TOKEN_HEADER] = this._options.hockeyAppToken;

        return requestOptions;
    }

    /**
        * Get all Apps
        * @returns http://support.hockeyapp.net/kb/api/api-apps#list-apps
        */
    public getApps(): Q.IPromise<any> {
        var deferred = Q.defer();

        var options = this.createRequestOptions(HockeyApp.GET_APPS_PATH);
        request(options, function (error, response, body) {
            var json = JSON.parse(body);
            deferred.resolve(json);
        });

        return deferred.promise;
    }

    /**
        * Get all Versions of an app
        * @param app: Response from HockeyApp.prototype.getApps
        * @returns http://support.hockeyapp.net/kb/api/api-versions#list-versions
        */
    public getVersions(app: any): Q.IPromise<any> {
        var deferred = Q.defer();

        var public_identifier = app.public_identifier;
        var options = this.createRequestOptions(
            HockeyApp.GET_APP_VERSION_PATH.replace('{public_identifier}', public_identifier));
        request(options, function (error, response, body) {
            var json = JSON.parse(body);
            deferred.resolve(json);
        });

        return deferred.promise;
    }

    /**
        * Get latest version download link for Android app
        * @param app: Response from HockeyApp.prototype.getApps
        * @param version: Response from HockeyApp.prototype.getVersions
        * @returns Downloadable APK
        */
    public getLatestAndroidVersionDownloadLink(app: any, version: any): string {
        var public_identifier = app.public_identifier;
        var id = version.id;
        var downloadUrl = HockeyApp.BASE_URL + HockeyApp.GET_ANDROID_APP_DOWNLOAD_PATH
            .replace('{public_identifier}', public_identifier)
            .replace("{id}", id);
        return downloadUrl;
    };
}
