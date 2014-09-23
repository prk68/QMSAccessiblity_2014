 var module = angular.module('approveRejectListModule', []);


 module.controller('approveRejectListController', function($scope, multiDraftLoader, adminListLoader){

 	$scope.results = multiDraftLoader;
 	console.log($scope.results)
	for(i=0; i<$scope.results.length; ++i)
		$scope.results[i].show = true
	$scope.admins = adminListLoader.admins
	$scope.selectedOwner = ""
	$scope.selectedReviewer = ""

	$scope.filter = function()
	{
		for(i=0; i<$scope.results.length; ++i)
		{
			$scope.results[i].show = true
			if(($scope.selectedReviewer && $scope.selectedReviewer != $scope.results[i].metaData.reviewer) || ($scope.selectedOwner && $scope.selectedOwner != $scope.results[i].metaData.owner))
				$scope.results[i].show = false
		}
	}

	$scope.showAll = function()
	{
		for(i=0; i<$scope.results.length; ++i)
			$scope.results[i].show = true		
		
	}

})