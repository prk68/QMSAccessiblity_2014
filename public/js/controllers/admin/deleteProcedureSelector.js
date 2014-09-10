 

 var module = angular.module('deleteProcedureSelectorModule', []);

var showMsgSuc = false
var showMsgFail = false

 module.controller('deleteProcedureSelectorController', function($scope, $http, $location, $route, multiProcLoader){

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
	$scope.showMsgSuc = showMsgSuc
	$scope.showMsgFail = showMsgFail
	console.log($scope.showMsg)
	$scope.procedureSelected = function() {
								$http.post('/deleteProcedure/',{pid:$scope.selectedPid}).then(function(){
									showMsgSuc = true
									$route.reload()				

								},
								function()
								{
									$route.reload()
									showMsgFail = true
																
								})
						}


	$scope.updateSelection = function() {
							
							console.log( $scope.selectedProcedure)
							index = $scope.selectedProcedure.indexOf('|') 
							$scope.selectedPid = $scope.selectedProcedure.substring(0, index)	
																			
						}

})