/// <reference path="../typings/main/ambient/request/request.d.ts" />
/// <reference path="../typings/main/ambient/q/q.d.ts" />
import Q = require('q');
declare class HockeyApp {
    static BASE_URL: string;
    static GET_APPS_PATH: string;
    static GET_APP_VERSION_PATH: string;
    static GET_ANDROID_APP_DOWNLOAD_PATH: string;
    static HOCKEY_APP_TOKEN_HEADER: string;
    private _options;
    constructor(options: any);
    private Options;
    private init(options);
    /**
     * Create request options for this API wrapper
     * @param urlPath API path
     * @param method GET by default
     */
    private createRequestOptions(urlPath, method?);
    /**
     * Get all Apps
     * @returns http://support.hockeyapp.net/kb/api/api-apps#list-apps
     */
    getApps(): Q.IPromise<any>;
    /**
     * Get all Versions of an app
     * @param app: Response from HockeyApp.prototype.getApps
     * @returns http://support.hockeyapp.net/kb/api/api-versions#list-versions
     */
    getVersions(app: any): Q.IPromise<any>;
    /**
     * Get latest version download link for Android app
     * @param app: Response from HockeyApp.prototype.getApps
     * @param version: Response from HockeyApp.prototype.getVersions
     * @returns Downloadable APK
     */
    getLatestAndroidVersionDownloadLink(app: any, version: any): string;
}
export = HockeyApp;
