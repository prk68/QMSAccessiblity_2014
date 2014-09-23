var activityLogModule = angular.module('activityLogModule', [])

activityLogModule.controller('activityLogController', function($scope, activityLogLoader){
	


	$scope.results = activityLogLoader
	for(i=0; i<$scope.results.length; ++i)
		$scope.results[i].show = true
	
	$scope.pids = []
	$scope.owners = []

	$scope.selectedPid = ""
	$scope.selectedType = ""


	for(i=0; i<activityLogLoader.length; ++i)
	{
		if($scope.pids.indexOf(activityLogLoader[i].pid) == -1)
			$scope.pids.push(activityLogLoader[i].pid)

		if($scope.owners.indexOf(activityLogLoader[i].author) == -1)
			$scope.owners.push(activityLogLoader[i].author)
	}

	$scope.types= ["Created", "Edited", "Removed", "Reverted", "Restored"]
	console.log($scope.results)


	$scope.filter = function(){

		for(i=0; i<$scope.results.length; ++i)
		{
			$scope.results[i].show = true
			if( ($scope.selectedPid && $scope.results[i].pid != $scope.selectedPid) || 
				($scope.selectedOwner && $scope.results[i].author != $scope.selectedOwner) ||
				($scope.selectedType && $scope.results[i].type != $scope.selectedType) )
				$scope.results[i].show = false
		}

	}


	$scope.showAll = function(){
		for(i=0; i<$scope.results.length; ++i)
			$scope.results[i].show = true
	}

})