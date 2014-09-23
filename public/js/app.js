var mod = angular.module('qmsAccessibility', ['ngRoute', 'appRoutes', 'ui.bootstrap', 'procedureListCtrlModule', 'procedureReaderCtrlModule', 'ngSanitize', 'activityLogModule','searchCtrlModule', 'ngResource', 'dBProcedureServiceModule']);

/*
This directive allows us to pass a function in on an enter key to do what we want.
 */
mod.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});


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


