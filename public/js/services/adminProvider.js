var adminProvider = angular.module('adminProvider', ['ngResource'])

adminProvider.factory('adminResource',['$resource', function($resource){	
	return $resource("/admin/list")	
}]);
	
	
adminProvider.factory('adminProviderService', ['adminResource', '$q', '$route' , function(adminResource, $q, $route){

	return function(){

		var delay = $q.defer()
		console.log('boooooooooooooooooooooooootttttttttttttttt')
		adminResource.get( 
		function(list)
		{
			delay.resolve(list)

		}, 
		function()
		{
			delay.reject('unable to fetch')
		})
		return delay.promise
	}
}]);
	