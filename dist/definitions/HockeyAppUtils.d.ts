/**
 * Utilities for HockeyApp API Wrapper
 */
export default class HockeyAppUtils {
    /**
     * From the response of "getApps" returns an item that match the name
     * @param appsResponse response from getApps method
     * @param match title to match
     */
    static getAppByTitleMatch(appsResponse: any, match: string): any;
    /**
     * From the response of "getVersions" returns the latest version
     * @param versionResponse response from getVersions method
     */
    static getLatestVersion(versionResponse: any): any;
}
