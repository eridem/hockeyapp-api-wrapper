/**
 * Utilities for HockeyApp API Wrapper
 */
export default class HockeyAppUtils {
    /**
     * From the response of "getApps" returns an item that match the name
     * @param appsResponse response from getApps method
     * @param match title to match
     */
    static getAppByTitleMatch(appsResponse: HockeyAppModels.IAppResponse, match: string): HockeyAppModels.IApp;
    /**
    * From the response of "getApps" returns an item that match the id
    * @param appsResponse response from getApps method
    * @param match title to match
    */
    static getAppByIdMatch(appsResponse: HockeyAppModels.IAppResponse, match: string): HockeyAppModels.IApp;
    /**
     * From the response of "getVersions" returns the latest version
     * @param versionResponse response from getVersions method
     */
    static getLatestVersion(versionResponse: HockeyAppModels.IVersionResponse): HockeyAppModels.IVersion;
}
