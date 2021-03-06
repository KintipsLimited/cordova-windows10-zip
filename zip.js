var exec = cordova.require('cordova/exec');

function newProgressEvent(result) {
    var event = {
            loaded: result.loaded,
            total: result.total
    };
    return event;
}

exports.unzip = function(fileName, outputDirectory, callback, progressCallback) {
    if(cordova.platformId == 'windows'){
            var win = function() {
                callback(0);
            };
            var fail = function() {
                callback(-1);
            };
            exec(win, fail, 'extractFile', 'uwp', [fileName, outputDirectory]);
    } else {
        var win = function(result) {
            if (result && typeof result.loaded != "undefined") {
                if (progressCallback) {
                    return progressCallback(newProgressEvent(result));
                }
            } else if (callback) {
                callback(0);
            }
        };
        var fail = function(result) {
            if (callback) {
                callback(-1);
            }
        };
        exec(win, fail, 'Zip', 'unzip', [fileName, outputDirectory]);
    }
};


exports.getAppFullPath = function() {
    return Windows.Storage.ApplicationData.current.localFolder.path;
};