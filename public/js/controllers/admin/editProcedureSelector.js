 

 var module = angular.module('editProcedureSelectorModule', []);

 module.controller('editProcedureSelectorController', function($scope, $http, $location){


 	$scope.defaultLabel = "Select a procedure from the drop down list"

 	$http.get('/procedures/all').success(function(result, status, headers, config) {
			$scope.procedures = result;
			$scope.selectedProcedure = $scope.procedures[0].pid + '| ' + $scope.procedures[0].pname  
			$scope.selectedPid = $scope.procedures[0].pid
			console.log(result)
	});

	$scope.procedureSelected = function() {
							$location.path('/admin/procedurecrud/step1').search({id: $scope.selectedPid});							
						}


	$scope.updateSelection = function() {
							
							console.log( $scope.selectedProcedure)
							index = $scope.selectedProcedure.indexOf('|') 
							$scope.selectedPid = $scope.selectedProcedure.substring(0, index)	
																			
						}

})