 

 var module = angular.module('procedureRevListCtrl', []);
 

 module.controller('procedureRevListController', function($scope, $http, $location, $route, procedureDBLoader, existingDraft, versionList, baselineObj, $window, $sce){
 	
 	if(existingDraft.pid)
 		$location.path('/admin/locked')

	$scope.procedure = procedureDBLoader
	
	$scope.baseline = baselineObj.baseline
	console.log($scope.procedure)
	$scope.revisions = []
	for(i=0; i<versionList.versions.length; ++i)
		$scope.revisions.push({version:versionList.versions[i], modifDate: versionList.dates[i]})

	console.log(versionList)
	$scope.comments = ""

	console.log($scope.procedure)

	$scope.consultActivated = false;
	$scope.selectedVersion = $scope.procedure.active_version

	$scope.consultProcedure = function(nver) 
							  {
								    $http.get('/admin/procedure/version/', {params:{id:$scope.procedure.pid,rev:nver}}).success(function(procVersion)
									{
										console.log(procVersion)
										$scope.consultActivated = true;
										$scope.html = $sce.trustAsHtml($scope.procedure.data.content);
										$scope.archiveVersion = procVersion
									})	
							  }  


	$scope.revertProcedure = function(nver) 
							 {
								$http.post('/admin/revert', {pid:$scope.procedure.pid,version:nver, owner:$window.sessionStorage.username,	omments:$scope.comments}).success(
									function()
									{
										$route.reload()
									})																										
							 }

})