
var procedureListCtrlModule = angular.module('procedureListCtrlModule', [])

procedureListCtrlModule.controller('procedureListController', function($scope, $http){
	
	$http.get('/procedures/all').success(function(result, status, headers, config) {
			$scope.procedures = result;
			console.log(result)
	});

})