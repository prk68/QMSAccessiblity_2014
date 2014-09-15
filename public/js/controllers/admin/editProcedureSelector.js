 

 var module = angular.module('editProcedureSelectorModule', []);

 module.controller('editProcedureSelectorController', function($scope, $http, $location, $route, multiProcLoader){
 	$scope.procedures = multiProcLoader
	console.log($scope.procedures)	
	$scope.heading = "Edit Procedure"
	if($scope.procedures.length > 0)
	{
		$scope.selectedProcedure = $scope.procedures[0].pid + '| ' + $scope.procedures[0].pname 
		$scope.selectedPid = $scope.procedures[0].pid
	}

	$scope.procedureSelected = function() {
							if($scope.selectedPid)
								$location.path('/admin/procedurecrud/step1').search({id: $scope.selectedPid});										
							}


	$scope.updateSelection = function() {
							
							console.log( $scope.selectedProcedure)
							index = $scope.selectedProcedure.indexOf('|') 
							$scope.selectedPid = $scope.selectedProcedure.substring(0, index)	
																			
						}

})