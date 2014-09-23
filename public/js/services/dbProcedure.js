var module = angular.module('dBProcedureServiceModule', ['ngResource'])


module.factory('procedureResource', ['$resource', function($resource){

			return $resource("/procedures/:id", {id: '@pid'})
}]);


module.factory('draftResource', ['$resource', function($resource){

			return $resource("/admin/drafts/:id", {id: '@pid'})
}]);

module.factory('versionListResource', ['$resource', function($resource){

			return $resource("/versions/:id", {id: '@pid'})
}]);

module.factory('versionResource', ['$resource', function($resource){

			return $resource("/procedure/baseline/:id", {id: '@pid'})
}]);


module.factory('procedureFromDBLoader', ['procedureResource', '$q', '$route' , function(procedureResource, $q, $route){

	return function(){

		var delay = $q.defer()
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

module.factory('versionNumberLoader', ['versionResource', '$q', '$route' , function(versionResource, $q, $route){

	return function(){

		var delay = $q.defer()
		if(!$route.current.params.id){
			delay.resolve({})
			return delay.promise;
		}
			
		versionResource.get({id:$route.current.params.id}, 
		function(version)
		{			
			console.log(version)
			delay.resolve(version)

		}, 
		function()
		{
			delay.reject('unable to fetch')
		})
		return delay.promise
	}
}]);


module.factory('versionList', ['versionListResource', '$q', '$route' , function(versionListResource, $q, $route){

	return function(){

		var delay = $q.defer()
		if(!$route.current.params.id){
			delay.resolve({})
			return delay.promise;
		}
			
		versionListResource.get({id:$route.current.params.id}, 
		function(versions)
		{			
			delay.resolve(versions)

		}, 
		function()
		{
			delay.reject('unable to fetch')
		})
		return delay.promise
	}
}]);

module.factory('draftFromDBLoader', ['draftResource', '$q', '$route' , function(draftResource, $q, $route){

	return function(){

		var delay = $q.defer()
		console.log($route.current.params.id)
		if(!$route.current.params.id){
			delay.resolve({})
			return delay.promise;
		}
			
		draftResource.get({id:$route.current.params.id}, 
		function(draft)
		{			
			console.log(draft)
			delay.resolve(draft)

		}, 
		function()
		{
			console.log("ddddddddddddddddddddddddd")
			delay.reject('unable to fetch')
		})
		return delay.promise
	}
}]);
	
	
module.factory('multiProcedureLoader', ['procedureResource', '$q', '$route' , function(procedureResource, $q, $route){

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


module.factory('multiDraftLoader', ['draftResource', '$q', '$route' , function(draftResource, $q, $route){

	return function(){

		var delay = $q.defer()
		console.log('boooooooooooooooooooooooootttttttttttttttt22222222222222222222222222222')
		draftResource.query(
		function(drafts)
		{
			
			delay.resolve(drafts)

		}, 
		function()
		{
			delay.reject('unable to fetch')
		})
		return delay.promise
	}
}]);






module.factory('trashedProcedureResource', ['$resource', function($resource){

			return $resource("/admin/procedures/trash/:id", {id: '@pid'})
}]);


module.factory('activityLogResource', ['$resource', function($resource){

			return $resource("/activity")
}]);
	
module.factory('trashProcedureLoader', ['trashedProcedureResource', '$q', '$route' , function(trashedProcedureResource, $q, $route){

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



module.factory('multiTrashProcedureLoader', ['trashedProcedureResource', '$q', '$route' , function(trashedProcedureResource, $q, $route){

	return function(){

		var delay = $q.defer()
		console.log('booooooooooooooooooooooooo44444444444444444444444444')
		trashedProcedureResource.query(function(procedures)
		{
			console.log('matchhhhhhhhhhhhhhhhhhhhhhhhhhhhh')
			console.log(procedures)
			delay.resolve(procedures)

		}, 
		function()
		{
			console.log('matchhhhhhhhhhhhhhhhhhhhhhhhhhhhh')
			delay.reject('unable to fetch')
		})

		return delay.promise
	}
}]);


module.factory('activityLogLoader', ['activityLogResource', '$q', '$route' , function(activityLogResource, $q, $route){

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



