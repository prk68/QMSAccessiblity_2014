var procedureFromDB = angular.module('dBProcedureServiceModule', ['ngResource'])


procedureFromDB.factory('procedureResource', ['$resource', function($resource){

			return $resource("/procedures/:id", {id: '@pid'})
}]);


procedureFromDB.factory('trashedProcedureResource', ['$resource', function($resource){

			return $resource("/procedures/trash/:id", {id: '@pid'})
}]);


procedureFromDB.factory('activityLogResource', ['$resource', function($resource){

			return $resource("/activity")
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
	
procedureFromDB.factory('trashProcedureLoader', ['trashedProcedureResource', '$q', '$route' , function(trashedProcedureResource, $q, $route){

	return function(){

		var delay = $q.defer()
		console.log('boooooooooooooooooooooooootttttttttttttttt33333333333332')
		trashedProcedureResource.get(function(procedures)
		{
			console.log(procedures)
			delay.resolve(procedures)

		}, 
		function()
		{
			delay.reject('unable to fetch')
		})
		return delay.promise
	}
}]);



procedureFromDB.factory('multiTrashProcedureLoader', ['trashedProcedureResource', '$q', '$route' , function(trashedProcedureResource, $q, $route){

	return function(){

		var delay = $q.defer()
		console.log('booooooooooooooooooooooooo44444444444444444444444444')
		trashedProcedureResource.query(function(procedures)
		{
			console.log(procedures)
			delay.resolve(procedures)

		}, 
		function()
		{
			delay.reject('unable to fetch')
		})
		return delay.promise
	}
}]);


procedureFromDB.factory('activityLogLoader', ['activityLogResource', '$q', '$route' , function(activityLogResource, $q, $route){

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



