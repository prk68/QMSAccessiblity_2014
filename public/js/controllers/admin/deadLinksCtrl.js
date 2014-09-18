var activityLogModule = angular.module('deadLinksLogModule', [])

activityLogModule.controller('deadLinksController', function($scope, deadLinksLoader){
	
	$scope.results = deadLinksLoader
	console.log($scope.results)
	
})