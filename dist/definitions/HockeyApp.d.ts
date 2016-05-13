import Q = require('q');
/**
 * Options for initialization or set up.
 */
export interface IOptions {
    hockeyAppToken: string;
}
export default class HockeyApp {
    /**
     * Information about requests
     */
    static BASE_URL: string;
    static GET_APPS_PATH: string;
    static GET_APP_VERSION_PATH: string;
    static GET_ANDROID_APP_DOWNLOAD_PATH: string;
    static HOCKEY_APP_TOKEN_HEADER: string;
    /**
     * Options for initialization or set up.
     */
    private _options;
    private Options;
    /**
     * Constructor
     * @param options can be a string with the Auth Key or an object with the class options
     */
    constructor(options: any);
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
    getApps(): Q.IPromise<HockeyAppModels.IAppResponse>;
    /**
     * Get all Versions of an app
     * @param app: Response from HockeyApp.prototype.getApps
     * @returns http://support.hockeyapp.net/kb/api/api-versions#list-versions
     */
    getVersions(app: HockeyAppModels.IApp): Q.IPromise<HockeyAppModels.IVersionResponse>;
    /**
     * Get latest version download link for Android app
     * @param app: Response from HockeyApp.prototype.getApps
     * @param version: Response from HockeyApp.prototype.getVersions
     * @returns Downloadable APK
     */
    getLatestAndroidVersionDownloadLink(app: HockeyAppModels.IApp, version: HockeyAppModels.IVersion): string;
}
