[![Build Status](https://travis-ci.org/eridem/hockeyapp-api-wrapper.svg?branch=master)](https://travis-ci.org/eridem/hockeyapp-api-wrapper)

# HockeyApp module helper for NodeJS
 
This module wraps the [HockeyApp API](http://support.hockeyapp.net/kb/api). The work is in progress and so far only covers the solutions are needed in our teams.

Please, be free to collaborate!

# How to use it

## Create open download link for Android APK

```
// Import module
var HockeyApp = require('hockeyapp-api-wrapper');

// HockeyApp Auth Token
var YOUR_HOCKEYAPP_AUTH_TOKEN = 'aaaabbbbccccdddd0000111122223333';
var YOUR_APP_TITLE = 'YOUR HOCKEYAPP APP TITLE';

// Init client
var hockeyAppCli = new HockeyApp.Client(YOUR_HOCKEYAPP_AUTH_TOKEN);

hockeyAppCli.getApps().then(function(appsResponse) {
    var app = HockeyApp.Utils.getAppByTitleMatch(appsResponse, YOUR_APP_TITLE);

    hockeyAppCli.getVersions(app).then(function(versionResponse) {
        var version = HockeyApp.Utils.getLatestVersion(versionResponse);

        var downloadUrl = hockeyAppCli.getLatestAndroidVersionDownloadLink(app, version, "apk");

        console.log(downloadUrl);
    });
});
```

## By Id

```
// Import module
var HockeyApp = require('hockeyapp-api-wrapper');

// HockeyApp Auth Token
var YOUR_HOCKEYAPP_AUTH_TOKEN = 'aaaabbbbccccdddd0000111122223333';
var YOUR_APP_ID = 'aaaabbbbccccdddd0000111122223333'

// Init client
var hockeyAppCli = new HockeyApp.Client(YOUR_HOCKEYAPP_AUTH_TOKEN);

hockeyAppCli.getApps().then(function(appsResponse) {
    var app = HockeyApp.Utils.getAppByIdMatch(appsResponse, YOUR_APP_ID);

    hockeyAppCli.getVersions(app).then(function(versionResponse) {
        var version = HockeyApp.Utils.getLatestVersion(versionResponse);

        var downloadUrl = hockeyAppCli.getLatestAndroidVersionDownloadLink(app, version, "apk");

        console.log(downloadUrl);
    });
});
```

## Additional notes

- Moved to GitHub
- Add Travis CI