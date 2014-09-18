 

 var module = angular.module('linksSelectorModule', []);

 module.controller('linksSelectorController', function($scope, $http, $location, $route, multiTrashProcLoader){
 	$scope.procedures = multiTrashProcLoader
	console.log($scope.procedures)	
	$scope.heading = "Check for dead links to trashed procedures"
	if($scope.procedures.length > 0)
	{
		$scope.selectedProcedure = $scope.procedures[0].pid + '| ' + $scope.procedures[0].pname 
		$scope.selectedPid = $scope.procedures[0].pid
	}

	$scope.procedureSelected = function() {
							if($scope.selectedPid)
								$location.path('/admin/links').search({id: $scope.selectedPid});										
							}


	$scope.updateSelection = function() {
							
							console.log( $scope.selectedProcedure)
							index = $scope.selectedProcedure.indexOf('|') 
							$scope.selectedPid = $scope.selectedProcedure.substring(0, index)	
																			
						}

})