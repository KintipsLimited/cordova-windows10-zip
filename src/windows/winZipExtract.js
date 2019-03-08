cordova.commandProxy.add("extractFile",
    {
        uwp: async function (successCallback, errorCallback, args){
            var zipFileName = args[0];
            var outputDirectory = args[1];
        
            try{
                var service = new WinRuntimes.Service();
                var s = await service.extractFile(zipFileName, outputDirectory);
                successCallback(1);
            } catch (e){
                errorCallback(0);
            }
        } 
    }
);