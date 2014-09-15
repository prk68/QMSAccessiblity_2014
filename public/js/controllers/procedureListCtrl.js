
var procedureListCtrlModule = angular.module('procedureListCtrlModule', [])

procedureListCtrlModule.controller('procedureListController', function($scope, $http, multiProcLoader){
	$scope.results =multiProcLoader
	console.log( $scope.results)

	$scope.changeOrder = function()
	{
		console.log('test')
	}
})