 

 var module = angular.module('revertProcedureSelectorModule', []);


 module.controller('revertProcedureSelectorController', function($scope, $http, $location, $route, multiProcLoader){

	$scope.procedures = multiProcLoader	
	$scope.heading = "Revert Procedure"
	$scope.selectedProcedure = '';
	$scope.selectedPid = '';
	if($scope.procedures.length > 0)
	{
		$scope.selectedProcedure = $scope.procedures[0].pid + '| ' + $scope.procedures[0].pname 
		$scope.selectedPid = $scope.procedures[0].pid
	}
	
	$scope.procedureSelected = function() {
								if($scope.selectedPid)
								{
									$http.get('/admin/locked/'+$scope.selectedPid).then(
									function(obj)
									{
										if(obj.data.locked)
										{
											$scope.showMsgLock = true
											$scope.locker = obj.data.locker
										}
										else
											$location.path('/admin/procedure/revert').search({id: $scope.selectedPid});
									}, 
									function(err)
									{
										$location.path('/admin/fail-selection')
									})
								}
							}


	$scope.updateSelection = function() {
							
							console.log( $scope.selectedProcedure)
							index = $scope.selectedProcedure.indexOf('|') 
							$scope.selectedPid = $scope.selectedProcedure.substring(0, index)	
																			
						}

})