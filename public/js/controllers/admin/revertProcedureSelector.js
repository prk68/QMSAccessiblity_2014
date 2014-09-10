 

 var module = angular.module('revertProcedureSelectorModule', []);


 module.controller('revertProcedureSelectorController', function($scope, $http, $location, $route, multiProcLoader){

	$scope.procedures =[]
	for(i=0; i<multiProcLoader.length; ++i)
		if(multiProcLoader[i].trashed == false)
			$scope.procedures.push(multiProcLoader[i])
	
	$scope.selectedProcedure = '';
	$scope.selectedPid = '';
	if($scope.procedures.length > 0){
		$scope.selectedProcedure = $scope.procedures[0].pid + '| ' + $scope.procedures[0].versions[$scope.procedures[0].baseline].pname 
		$scope.selectedPid = $scope.procedures[0].pid
	}
	
	$scope.procedureSelected = function() {
								if($scope.selectedPid)
									$location.path('/admin/procedure/revert').search({id: $scope.selectedPid});
						}


	$scope.updateSelection = function() {
							
							console.log( $scope.selectedProcedure)
							index = $scope.selectedProcedure.indexOf('|') 
							$scope.selectedPid = $scope.selectedProcedure.substring(0, index)	
																			
						}

})