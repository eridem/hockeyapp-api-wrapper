'use strict';

/**
 * Utilities for HockeyApp API Wrapper
 */
export default class HockeyAppUtils {
    /**
     * From the response of "getApps" returns an item that match the name
     * @param appsResponse response from getApps method
     * @param match title to match
     */
    public static getAppByTitleMatch(appsResponse:any, match:string):any {
        var apps = appsResponse.apps;

        for (var i = 0; i < apps.length; i++) {
            if (apps[i].title == match) {
                return apps[i];
            }
        }

        return null;
    };

    /**
     * From the response of "getVersions" returns the latest version
     * @param versionResponse response from getVersions method
     */
    public static getLatestVersion(versionResponse: any):any {
        return versionResponse.app_versions[0];
    };
}