'use strict';
/**
 * Utilities for HockeyApp API Wrapper
 */
var HockeyAppUtils = (function () {
    function HockeyAppUtils() {
    }
    /**
     * From the response of "getApps" returns an item that match the name
     * @param appsResponse response from getApps method
     * @param match title to match
     */
    HockeyAppUtils.getAppByTitleMatch = function (appsResponse, match) {
        var apps = appsResponse.apps;
        for (var i = 0; i < apps.length; i++) {
            if (apps[i].title == match) {
                return apps[i];
            }
        }
        return null;
    };
    ;
    /**
    * From the response of "getApps" returns an item that match the id
    * @param appsResponse response from getApps method
    * @param match title to match
    */
    HockeyAppUtils.getAppByIdMatch = function (appsResponse, match) {
        var apps = appsResponse.apps;
        for (var i = 0; i < apps.length; i++) {
            if (apps[i].public_identifier == match) {
                return apps[i];
            }
        }
        return null;
    };
    ;
    /**
     * From the response of "getVersions" returns the latest version
     * @param versionResponse response from getVersions method
     */
    HockeyAppUtils.getLatestVersion = function (versionResponse) {
        return versionResponse.app_versions[0];
    };
    ;
    return HockeyAppUtils;
}());
exports.__esModule = true;
exports["default"] = HockeyAppUtils;
