'use strict';
var HockeyAppUtils = (function () {
    function HockeyAppUtils() {
    }
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
    HockeyAppUtils.getLatestVersion = function (versionResponse) {
        return versionResponse.app_versions[0];
    };
    ;
    return HockeyAppUtils;
}());
exports["default"] = HockeyAppUtils;
