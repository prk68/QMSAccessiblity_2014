var procedureFromDB = angular.module('dBProcedureServiceModule', ['ngResource'])


procedureFromDB.factory('procedureResource', ['$resource', function($resource){

			return $resource("/procedure/:id", {id: '@pid'})
}]);



procedureFromDB.factory('procedureFromDbInitializer', ['procedureResource', '$q', '$route' , function(procedureResource, $q, $route){

	return function(){

		var delay = $q.defer()
		procedureResource.get({id:$route.current.params.id}, 
		function(procedure)
		{
			delay.resolve(procedure)

		}, 
		function()
		{
			delay.reject('unable to fetch')
		})
		return delay.promise
	}
}]);
	
	
	