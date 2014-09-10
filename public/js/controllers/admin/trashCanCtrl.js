var trashCanCtrlModule = angular.module('trashCanCtrlModule', [])

trashCanCtrlModule.controller('trashCanController', function($scope, $http, $route, multiProcLoader){
	
	$scope.procedures =[]
	for(i=0; i<multiProcLoader.length; ++i)
		if(multiProcLoader[i].trashed == true)
			$scope.procedures.push(multiProcLoader[i])

	$scope.restoreProcedure = function(procedureId){
		console.log('inside restore')
		$http.post('/admin/restore/', {pid: procedureId}).success(function(result, status, headers, config) {
			 $route.reload();
	});
	}

})