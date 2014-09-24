angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider, $location) {
	console.log($routeProvider)
	$routeProvider
	
		.when('/procedure/library', {
			templateUrl: '../views/procedureList.html',
			controller: 'procedureListController',
			resolve: {
				multiProcLoader: function(multiProcedureLoader) {
					return multiProcedureLoader();
				}
			},
		})

		.when('/activity/log', {
			templateUrl: '../views/admin/activitylog.html',
			controller: 'activityLogController',
			resolve: {
				activityLogLoader: function(activityLogLoader) {
					return activityLogLoader();
				},				
			}		
		})

		.when('/statement', {
			templateUrl: '../views/construction.html',
		})

		.when('/answers', {
			templateUrl: '../views/construction.html',
		})

		.when('/templates', {
			templateUrl: '../views/construction.html',
		})

		.when('/reader/:id', {
			templateUrl: '../views/procedureReader.html',
			controller: 'procedureReaderController',
			resolve : {
				initializer: function(procedureFromDBLoader) {
						return procedureFromDBLoader();
					},
			}
		})

		.when('/searchQMS', {
			templateUrl: '../views/searchResults.html',
			controller: 'searchController'
		})		

	
		.otherwise({
			redirectTo: function() {
			console.log('bumped', arguments);
			return '/';
			}
		});
		
		
	$locationProvider.html5Mode(true);

}]);