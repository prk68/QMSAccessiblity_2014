

var procedureCRUDCtrlModule = angular.module('procedureReaderCtrlModule', [])


procedureCRUDCtrlModule.controller('procedureReaderController', function($scope, $http, $routeParams) {

	$http.get('/procedure/'+$routeParams.id).success(function(data, status, headers, config) 
		{
			console.log(data)
			$scope.procedure = data
		});

	$scope.printReader = function() {
		var printContents = document.getElementById("reader").innerHTML;
		var popupWin = window.open('', '_blank', 'width=300,height=300');
		popupWin.document.open()
		popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</html>');
		popupWin.document.close();
	}

})































