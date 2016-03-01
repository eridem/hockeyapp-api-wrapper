'use strict';

class HockeyAppUtils {
    public static getAppByTitleMatch(appsResponse:any, match:string):any {
        var apps = appsResponse.apps;

        for (var i = 0; i < apps.length; i++) {
            if (apps[i].title == match) {
                return apps[i];
            }
        }

        return null;
    };

    public static getLatestVersion(versionResponse: any):any {
        return versionResponse.app_versions[0];
    };
}

export = HockeyAppUtils;