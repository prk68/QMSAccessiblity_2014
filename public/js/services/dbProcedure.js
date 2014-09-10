var procedureFromDB = angular.module('dBProcedureServiceModule', ['ngResource'])


procedureFromDB.factory('procedureResource', ['$resource', function($resource){

			return $resource("/procedures/:id", {id: '@pid'})
}]);


procedureFromDB.factory('procedureFromDbInitializer', ['procedureResource', '$q', '$route' , function(procedureResource, $q, $route){

	return function(){

		var delay = $q.defer()
		console.log('boooooooooooooooooooooooootttttttttttttttt')
		if(!$route.current.params.id){
			delay.resolve({})
			return delay.promise;
		}
			
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
	
	
procedureFromDB.factory('multiProcedureLoader', ['procedureResource', '$q', '$route' , function(procedureResource, $q, $route){

	return function(){

		var delay = $q.defer()
		console.log('boooooooooooooooooooooooootttttttttttttttt22222222222222222222222222222')
		procedureResource.query(
		function(procedures)
		{
			
			delay.resolve(procedures)

		}, 
		function()
		{
			delay.reject('unable to fetch')
		})
		return delay.promise
	}
}]);
	