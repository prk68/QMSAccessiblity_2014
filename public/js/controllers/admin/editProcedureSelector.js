 

 var module = angular.module('editProcedureSelectorModule', []);

 module.controller('editProcedureSelectorController', function($scope, $http, $location, $route, multiProcLoader){
 	console.log('holllllllllaaaaaaa')
	$scope.procedures =[]
	for(i=0; i<multiProcLoader.length; ++i)
		if(multiProcLoader[i].trashed == false)
			$scope.procedures.push(multiProcLoader[i])
		
	$scope.selectedProcedure = $scope.procedures[0].pid + '| ' + $scope.procedures[0].versions[$scope.procedures[0].baseline].pname 
	$scope.selectedPid =  $scope.procedures[0].pid

	$scope.procedureSelected = function() {
							console.log( $scope.selectedPid)
							$location.path('/admin/procedurecrud/step1').search({id: $scope.selectedPid});
										
							}


	$scope.updateSelection = function() {
							
							console.log( $scope.selectedProcedure)
							index = $scope.selectedProcedure.indexOf('|') 
							$scope.selectedPid = $scope.selectedProcedure.substring(0, index)	
																			
						}

})