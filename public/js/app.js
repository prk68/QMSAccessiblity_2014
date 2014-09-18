var mod = angular.module('qmsAccessibility', ['ngRoute', 'appRoutes', 'ui.bootstrap', 'procedureListCtrlModule', 'procedureReaderCtrlModule', 'ngSanitize', 'activityLogModule','searchCtrlModule', 'ngResource', 'dBProcedureServiceModule']);

mod.controller('indexController', function($scope, $location){

	$scope.searchQuery = ""

 	$scope.search = function() {
 							if($scope.searchQuery.length >0 ){
								console.log("test2")
								$location.path('/searchQMS').search({q:$scope.searchQuery})															
							}
						}
})

mod.factory('activityLogResource', ['$resource', function($resource){

			return $resource("/activity")
}]);

mod.factory('activityLogLoader', ['activityLogResource', '$q', '$route' , function(activityLogResource, $q, $route){

	return function(){

		var delay = $q.defer()
		console.log('boooooooooooooooooooooooootttttttttttttttt')
		
			
		activityLogResource.query(
		function(log)
		{			
			delay.resolve(log)

		}, 
		function()
		{
			delay.reject('unable to fetch')
		})
		return delay.promise
	}
}]);

