 

 var module = angular.module('deleteProcedureSelectorModule', []);


 var defComments = "Enter a brief comment on why you want to remove this procedure.."
 module.controller('deleteProcedureSelectorController', function($scope, $http, $location, $route, multiProcLoader, $window){

	$scope.procedures = multiProcLoader
	$scope.comments = "Enter your comments on why you want to remove the procedure.."
	$scope.showComments = true
	$scope.showMsgFail = false

	if($scope.procedures.length > 0)
	{
		$scope.selectedProcedure = $scope.procedures[0].pid + '| ' + $scope.procedures[0].pname 
		$scope.selectedPid = $scope.procedures[0].pid
	}
	$scope.heading = "Remove Procedure"
	$scope.procedureSelected = function() {
								index = $scope.selectedProcedure.indexOf('|')
								var cmnts =  $scope.comments == defComments ? "" : $scope.comments
								console.log(cmnts)
								$http.post('/deleteProcedure/',{pid:$scope.selectedPid, 
																pname:$scope.selectedProcedure.substring(index, $scope.selectedProcedure.length),
																owner:$window.sessionStorage.username, comments: cmnts}).then(function(obj){
									
									$location.path('/admin/links').search({id: $scope.selectedPid, onDelete: true});
												
								//	$route.reload()

								},
								function()
								{
									$route.reload()
									$scope.showMsgFail = true
																
								})
						}


	$scope.updateSelection = function() {
							
							console.log( $scope.selectedProcedure)
							index = $scope.selectedProcedure.indexOf('|') 
							$scope.selectedPid = $scope.selectedProcedure.substring(0, index)	
																			
						}

})