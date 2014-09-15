angular.module('appAdminRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		.when('/admin', {
			templateUrl: '../views/admin/login.html',
			controller: 'loginController',
			access: { requiredLogin: false }
		})

		.when('/admin/login', {
			templateUrl: '../views/admin/login.html',
			controller: 'loginController',
			access: { requiredLogin: false }
		})

		.when('/admin/logout', {
			templateUrl: '../views/admin/login.html',
			controller: 'loginController',
			access: { requiredLogin: false }
		})

		.when('/admin/home', {
			templateUrl: '../views/admin/home.html',
			access: { requiredLogin: true }
		})

		.when('/admin/procedurecrud/step1', {
			templateUrl: '../../views/procedureCRUD/stepone.html',
			controller: 'procedureCRUDController',
			resolve: {
				procedureDBLoader: function(procedureFromDbInitializer) {
					return procedureFromDbInitializer();
				},

				adminListLoader: function(adminProviderService) {
					return adminProviderService();
				},
			},
			access: { requiredLogin: true }
		})

		.when('/admin/procedurecrud/step2', {
			templateUrl: '../../views/procedureCRUD/steptwo.html',
			controller: 'procedureCRUDController',
			resolve: {
				procedureDBLoader: function(procedureFromDbInitializer) {
					return procedureFromDbInitializer();
				},
				adminListLoader: function(adminProviderService) {
					return adminProviderService();
				},
			},
			access: { requiredLogin: true }
		})

		.when('/admin/procedurecrud/step3', {
			templateUrl: '../../views/procedureCRUD/stepthree.html',
			controller: 'procedureCRUDController',
			resolve: {
				procedureDBLoader: function(procedureFromDbInitializer) {
					return procedureFromDbInitializer();
				},
				adminListLoader: function(adminProviderService) {
					return adminProviderService();
				},
			},
			access: { requiredLogin: true }
		})


		.when('/admin/procedurecrud/preview', {
			templateUrl: '../../views/procedureCRUD/preview.html',
			controller: 'procedureCRUDController',
			resolve: {
				procedureDBLoader: function(procedureFromDbInitializer) {
					return procedureFromDbInitializer();
				},
				adminListLoader: function(adminProviderService) {
					return adminProviderService();
				},
			},
			access: { requiredLogin: true }
		})

		.when('/admin/fail-procedure-add', {
			templateUrl: '../views/admin/fail-procedure-add.html',
			access: { requiredLogin: true }
		})
		
		.when('/admin/sucess-procedure-add', {
			templateUrl: '../../views/admin/sucess-procedure-add.html',
			access: { requiredLogin: true }	
		})

		.when('/admin/edit/selector', {
			templateUrl: '../../views/admin/procedureSelection.html',
			controller: 'editProcedureSelectorController',
			resolve: {
				multiProcLoader: function(multiProcedureLoader) {
					return multiProcedureLoader();
				}
			},
			access: { requiredLogin: true }			
		})

		.when('/admin/delete/selector', {
			templateUrl: '../../views/admin/procedureSelection.html',
			controller: 'deleteProcedureSelectorController',
			resolve: {
				multiProcLoader: function(multiProcedureLoader) {
					return multiProcedureLoader();
				}
			},
			access: { requiredLogin: true }	
		})


		.when('/admin/revert/selector', {
			templateUrl: '../../views/admin/procedureSelection.html',
			controller: 'revertProcedureSelectorController',
			resolve: {
				multiProcLoader: function(multiProcedureLoader) {
					return multiProcedureLoader();
				}
			},
			access: { requiredLogin: true }	
		})

		.when('/admin/procedure/revert', {
			templateUrl: '../../views/admin/procedureRevList.html',
			controller: 'procedureRevListController',
			resolve: {
				procedureDBLoader: function(procedureFromDbInitializer) {
					return procedureFromDbInitializer();
				},				
			},
			access: { requiredLogin: true }	
		})


		.when('/admin/trash', {
			templateUrl: '../../views/admin/trashcan.html',
			controller: 'trashCanController',
			resolve: {
				multiTrashProcLoader: function(multiTrashProcedureLoader) {
					return multiTrashProcedureLoader();
				},				
			},			
			access: { requiredLogin: true }	
		})

		.when('/admin/log', {
			templateUrl: '../../views/admin/activitylog.html',
			controller: 'activityLogController',
			resolve: {
				activityLogLoader: function(activityLogLoader) {
					return activityLogLoader();
				},				
			},			
			access: { requiredLogin: true }	
		})


		.otherwise({
			redirectTo: function() {
			console.log('bumped', arguments);
			return '/';
			}
		});
		
		
	$locationProvider.html5Mode(true);

}]);

