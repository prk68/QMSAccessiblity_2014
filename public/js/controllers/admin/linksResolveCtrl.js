 

 var module = angular.module('linksResolveModule', []);


 module.controller('linksResolveController', function($scope, $http, $routeParams){

	$http({url: '/searchHtml', method:"GET", params:{id:$routeParams.id}}).success(function(result, status, headers, config) {
	 console.log($routeParams.id)
	  $scope.pid = $routeParams.id
	  $scope.onDelete = $routeParams.onDelete
	  $scope.hits = result
	  console.log($scope.hits)
	
	})

})