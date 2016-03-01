# HockeyApp module helper for NodeJS
 
This module wraps the [HockeyApp API](http://support.hockeyapp.net/kb/api). The work is in progress and so far only covers the solutions are needed in our teams.

Please, be free to collaborate!

# How to use it

## Create open download link for Android APK

```
// Import module
var HAAW = require('hockeyapp-api-wrapper');

// HockeyApp Auth Token
var YOUR_HOCKEYAPP_AUTH_TOKEN = 'aaaabbbbccccdddd0000111122223333';

// Init client
var hockeyAppCli = new HAAW.HockeyApp(YOUR_HOCKEYAPP_AUTH_TOKEN);

hockeyAppCli.getApps().then(function(appsResponse) {
    var app = HAAW.Utils.getAppByTitleMatch(appsResponse, "YOUR HOCKEY APP TITLE");

    hockeyAppCli.getVersions(app).then(function(versionResponse) {
        var version = HAAW.Utils.getLatestVersion(versionResponse);

        var downloadUrl = hockeyAppCli.getLatestAndroidVersionDownloadLink(app, version);

        console.log(downloadUrl);
    });
});
```