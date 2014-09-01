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

		.when('/procedures/library', {
			templateUrl: '../views/procedureList.html',
			controller: 'procedureListController'
		})


		.when('/reader/:id', {
			templateUrl: '../views/procedureReader.html',
			controller: 'procedureReaderController'
		})

		.when('/search', {
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