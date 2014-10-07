var mod = angular.module('imagesCtrlModule', [])

mod.controller('imagesController', function($scope, fileUpload, imageLoader, $route, $location){
	
	$scope.showExistsMsg = false
	$scope.results = imageLoader
	for(i=0; i<$scope.results.length; ++i)
		$scope.results[i].show = true



	$scope.upload = function(){
		for(i=0; i<$scope.results.length; ++i)
		{
			if($scope.results[i].name == $scope.imgName)
			{
				$scope.showExistsMsg = true
				return
			}
		}
		if(!$scope.imgName || !$scope.myFile)
				return;

		fileUpload.uploadFileToUrl($scope.imgName, $scope.myFile, '/images/upload') .success(
			function(){
	       		$route.reload()
	       	}).error(
	        	function(){}
	      	);       
	}


	$scope.replace = function(){
		fileUpload.uploadFileToUrl($scope.imgName, $scope.myFile, '/images/upload').success(
			function(){
	        	$route.reload()
	        }).error(
	        	function(){}
	        );
	}


	$scope.cancel = function(){
		$scope.showExistsMsg = false
	}

	$scope.showImg = function(name){
		console.log(name)
		$location.path('/gallery').search({id: name});
	}

	$scope.query = ""
	$scope.search =function(){

		for(i=0; i<$scope.results.length; ++i)
			if($scope.query && $scope.results[i].name.indexOf($scope.query) != -1)
				$scope.results[i].show = true
			else
				$scope.results[i].show = false
	}

})