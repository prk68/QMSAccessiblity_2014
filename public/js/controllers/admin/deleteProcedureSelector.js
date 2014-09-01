 

 var module = angular.module('deleteProcedureSelectorModule', []);

 module.controller('deleteProcedureSelectorController', function($scope, $http, $location){


 	$scope.defaultLabel = "Select a procedure from the drop down list"

 	$http.get('/procedures/all').success(function(result, status, headers, config) {
			$scope.procedures = result;
			$scope.selectedProcedure = $scope.procedures[0].pid + '| ' + $scope.procedures[0].pname  
			$scope.selectedPid = $scope.procedures[0].pid
			console.log(result)
	});

	$scope.procedureSelected = function() {
							console.log($scope.selectedPid)
							$http.post('/deleteProcedure/', {id:$scope.selectedPid})							
						}


	$scope.updateSelection = function() {
							
							console.log( $scope.selectedProcedure)
							index = $scope.selectedProcedure.indexOf('|') 
							$scope.selectedPid = $scope.selectedProcedure.substring(0, index)	
																			
						}

})