 

 var module = angular.module('deleteProcedureSelectorModule', []);

 module.controller('deleteProcedureSelectorController', function($scope, $http, $location, $route, multiProcLoader, $window){

	$scope.procedures = multiProcLoader
	$scope.comments =""
	$scope.showComments = true
	$scope.showMsgFail = false

	if($scope.procedures.length > 0)
	{
		$scope.selectedProcedure = $scope.procedures[0].pid + '| ' + $scope.procedures[0].pname 
		$scope.selectedPid = $scope.procedures[0].pid
	}
	$scope.heading = "Remove Procedure"
	$scope.procedureSelected = function() {

									if($scope.selectedPid)
									{
										$http.get('/admin/locked/'+$scope.selectedPid).success(function(data){
											console.log(data)
											if(data.locked)
											{
												$scope.showMsgLock = true
												$scope.locker = data.locker
											}
											else
											{
												index = $scope.selectedProcedure.indexOf('|')
												$http.post('/deleteProcedure/',{pid:$scope.selectedPid, owner:$window.sessionStorage.username, comments: $scope.comments}).then(
																				function(obj)
																				{													
																					$location.path('/admin/links').search({id: $scope.selectedPid, onDelete: true});
																				},
																				function()
																				{
																					$route.reload()
																					$scope.showMsgFail = true
																												
																				})
											}
										})
									}
							}


	$scope.updateSelection = function() {
							
							console.log( $scope.selectedProcedure)
							index = $scope.selectedProcedure.indexOf('|') 
							$scope.selectedPid = $scope.selectedProcedure.substring(0, index)	
																			
						}

})