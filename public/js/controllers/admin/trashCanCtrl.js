var trashCanCtrlModule = angular.module('trashCanCtrlModule', [])

trashCanCtrlModule.controller('trashCanController', function($scope, $http, $route, multiTrashProcLoader, $window){
	
	$scope.procedures = multiTrashProcLoader
	$scope.consultActivated = false
	console.log($scope.procedures)

	$scope.restoreProcedure = function(procedureId, procedureName){
		console.log('inside restore')
		$http.post('/admin/restore/', {pid: procedureId, pname: procedureName, owner:$window.sessionStorage.username}).success(function(result, status, headers, config) {
			 $route.reload();
	});
	}


	$scope.consultProcedure = function(procedureId){
		console.log('inside consult')
		$scope.consultActivated = true
		$http.get('/procedures/trash/' + procedureId).success(function(result, status, headers, config) {
			 
			$scope.procedure = result
			console.log(result)
	});
	}

})