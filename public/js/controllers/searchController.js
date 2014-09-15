var mod = angular.module('searchCtrlModule', [])

mod.controller('searchController', function($scope, $http, $routeParams){

	$http({url: '/search', method:"GET", params:{q:$routeParams.q}}).success(function(result, status, headers, config) {
	  $scope.hits = result
	  for(i=0; i<$scope.hits.length; ++i)
	  	for(j=0; j<$scope.hits[i].snippets.length; ++j)
	  		$scope.hits[i].snippets[j] = $scope.hits[i].snippets[j] + '...'
	})
})