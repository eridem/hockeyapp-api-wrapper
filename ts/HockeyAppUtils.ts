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
    public static getAppByTitleMatch(appsResponse: HockeyAppModels.IAppResponse, match: string): HockeyAppModels.IApp {
        var apps = appsResponse.apps;

        for (var i = 0; i < apps.length; i++) {
            if (apps[i].title == match) {
                return apps[i];
            }
        }

        return null;
    };
    
     /**
     * From the response of "getApps" returns an item that match the id
     * @param appsResponse response from getApps method
     * @param match title to match
     */
    public static getAppByIdMatch(appsResponse: HockeyAppModels.IAppResponse, match: string): HockeyAppModels.IApp {
        var apps = appsResponse.apps;

        for (var i = 0; i < apps.length; i++) {
            if (apps[i].public_identifier == match) {
                return apps[i];
            }
        }

        return null;
    };

    public static getAppByVersionFilter(versionResponse: HockeyAppModels.IVersionResponse, filter: (version) => boolean) {
        var versions = versionResponse.app_versions;

        for (var i = 0; i < versions.length; i++) {
            let version = versions[i];
            if (filter(version)) {
                return version;
            }
        }

        return null;
    }

    /**
     * From the response of "getVersions" returns the latest version
     * @param versionResponse response from getVersions method
     */
    public static getLatestVersion(versionResponse: HockeyAppModels.IVersionResponse): HockeyAppModels.IVersion {
        return versionResponse.app_versions[0];
    };
}