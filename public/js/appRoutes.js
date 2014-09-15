angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider, $location) {

	$routeProvider

		.when('/addprocedure/step1', {
			templateUrl: '../views/procedureCRUD/stepone.html',
			controller: 'procedureCRUDController'
		
		})

		.when('/addprocedure/step2', {
			templateUrl: '../views/procedureCRUD/steptwo.html',
			controller: 'procedureCRUDController'
		})

		.when('/addprocedure/step3', {
			templateUrl: '../views/procedureCRUD/stepthree.html',
			controller: 'procedureCRUDController'
		})

		.when('/addprocedure/step4', {
			templateUrl: '../views/procedureCRUD/stepfour.html',
			controller: 'procedureCRUDController'
		})

		.when('/addprocedure/step5', {
			templateUrl: '../views/procedureCRUD/stepfive.html',
			controller: 'procedureCRUDController'
		})

		.when('/fail-procedure-add', {
			templateUrl: '../views/admin/fail-procedure-add.html',
			
		})
		
		.when('/sucess-procedure-add', {
			templateUrl: '../views/admin/sucess-procedure-add.html',
				
		})

		.when('/procedure/library', {
			templateUrl: '../views/procedureList.html',
			controller: 'procedureListController',
			resolve: {
				multiProcLoader: function(multiProcedureLoader) {
					return multiProcedureLoader();
				}
			},
		})


		.when('/reader/:id', {
			templateUrl: '../views/procedureReader.html',
			controller: 'procedureReaderController'
		})

		.when('/searchQMS', {
			templateUrl: '../views/searchResults.html',
			controller: 'searchController'
		})
		
		.when('/activity/log', {
			templateUrl: '../views/activitylog.html',
			controller: 'activityLogController',
			resolve: {
				activityLogLoader: function(activityLogLoader) {
					return activityLogLoader();
				},				
			}		
		})

	
		.otherwise({
			redirectTo: function() {
			console.log('bumped', arguments);
			return '/';
			}
		});
		
		
	$locationProvider.html5Mode(true);

}]);