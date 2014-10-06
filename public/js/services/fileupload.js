var mod = angular.module('fileUploadModule', [])


mod.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(fname, file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        fd.append('new_name', fname)
        return $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })       
    }
}]);