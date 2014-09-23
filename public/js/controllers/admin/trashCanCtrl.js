var trashCanCtrlModule = angular.module('trashCanCtrlModule', [])

trashCanCtrlModule.controller('trashCanController', function($scope, $http, $route, multiTrashProcLoader, $window){
	
	$scope.procedures = multiTrashProcLoader
	console.log($scope.procedures)
	$scope.consultActivated = false
	console.log($scope.procedures)

	$scope.restoreProcedure = function(procedureId){
								$http.post('/admin/restore/', {pid: procedureId, owner:$window.sessionStorage.username}).success(function(result, status, headers, config) {
			 						$route.reload();
								});
							}


	$scope.consultProcedure = function(procedureId){
		console.log('inside consult')
		$scope.consultActivated = true
		$http.get('/admin/procedures/trash/'+procedureId).success(function(result, status, headers, config) {
			 
			$scope.trashedProcedure = result
			console.log(result)
		});
	}

})