# HockeyApp module helper for NodeJS
 
This module wraps the [HockeyApp API](http://support.hockeyapp.net/kb/api). The work is in progress and so far only covers the solutions are needed in our teams.

Please, be free to collaborate!

# How to use it

## Create open download link for Android APK

```
// Import module
var HockeyApp = require('hockeyapp-api-wrapper');

var YOUR_HOCKEYAPP_AUTH_TOKEN = 'aaaabbbbccccdddd0000111122223333';

// Create API client. Note that you can create more than one at the same time.
var hockeyAppCli = new HockeyApp().init(YOUR_HOCKEYAPP_AUTH_TOKEN);

// Get all apps
hockeyAppCli.getApps().then(function(appsResponse) {
    // Get an specific app by the title
    var app = HockeyApp.getAppByTitleMatch(appsResponse, "YOUR HOCKEY APP TITLE");

    // Get all versions for that specific app
    hockeyAppCli.getVersions(app).then(function(versionResponse) {
        // Get latest version
        var version = HockeyApp.getLatestVersion(versionResponse);

        // Generate download link
        var downloadUrl = hockeyAppCli.getLatestAndroidVersionDownloadLink(app, version);

        // Print download link
        console.log(downloadUrl);
    });
});
```