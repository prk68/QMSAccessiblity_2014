var mod = angular.module('galleryModule', [])

mod.controller('galleryController', function($scope, $route){

$scope.url = '/res/images/'+$route.current.params.id

	
})