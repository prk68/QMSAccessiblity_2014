
var procedureListCtrlModule = angular.module('procedureListCtrlModule', [])

procedureListCtrlModule.controller('procedureListController', function($scope, $http){

	$scope.order = true
 	$scope.orderByField = 'Last Modifed Date';

	$http.get('/procedures/all').success(function(result, status, headers, config) {
			$scope.procedures = result;
			console.log(result)
	});

	$scope.changeOrder = function() {
							console.log("jcole")
							order = !order
						}

})