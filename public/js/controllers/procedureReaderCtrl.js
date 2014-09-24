

var procedureCRUDCtrlModule = angular.module('procedureReaderCtrlModule', [])


procedureCRUDCtrlModule.controller('procedureReaderController', function($scope, $http, $routeParams, $sce, initializer) {

	$scope.procedure = initializer
	console.log($scope.procedure)
	$scope.trustedHtml = $sce.trustAsHtml($scope.procedure.data.content);

	$scope.printReader = function() {
		var printContents = document.getElementById("reader").innerHTML;
		var popupWin = window.open('', '_blank', 'width=300,height=300');
		popupWin.document.open()
		popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</html>');
		popupWin.document.close();
	}

})































