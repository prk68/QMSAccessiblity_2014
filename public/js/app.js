var mod = angular.module('qmsAccessibility', ['ngRoute', 'appRoutes', 'procedureListCtrlModule', 'procedureReaderCtrlModule', 'ngSanitize', 'searchCtrlModule', 'ngResource', 'dBProcedureServiceModule']);

mod.controller('indexController', function($scope, $location){

	$scope.searchQuery = "Search the Quality Management System"

 	$scope.search = function() {
 							if($scope.searchQuery.length >0 ){
								console.log("test2")
								$location.path('/search').search({q:$scope.searchQuery})															
							}
						}
})