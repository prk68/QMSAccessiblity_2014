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

		/**********************************************************************************************************************/

		.when('/admin/new/form', {
			templateUrl: '../../views/procedureCRUD/procedureform.html',
			controller: 'procedureFormController',
			resolve: {
				initializer: function(emptyDraft) {
					return emptyDraft;
				},
				versionList: function(versionList) {
					return versionList();
				},
				existingDraft: function(draftFromDBLoader) {
					return draftFromDBLoader();
				},
				adminListLoader: function(adminProviderService) {
					return adminProviderService();
				},
			},
			access: { requiredLogin: true }
		})


		/**********************************************************************************************************************/

		.when('/admin/edit/form', {
			templateUrl: '../../views/procedureCRUD/procedureform.html',
			controller: 'procedureFormController',
			resolve: {
				initializer: function(procedureFromDBLoader) {
					return procedureFromDBLoader();
				},
				existingDraft: function(draftFromDBLoader) {
					return draftFromDBLoader();
				},

				versionList: function(versionList) {
					return versionList();
				},
				adminListLoader: function(adminProviderService) {
					return adminProviderService();
				},
			},
			access: { requiredLogin: true }
		})
		/**********************************************************************************************************************/


		.when('/admin/draft/form', {
			templateUrl: '../../views/procedureCRUD/procedureform.html',
			controller: 'procedureFormController',
			resolve: {
				initializer: function(draftFromDBLoader) {
					return draftFromDBLoader();
				},
				versionList: function(versionList) {
					return versionList();
				},
				existingDraft: function(draftFromDBLoader) {
					return draftFromDBLoader();
				},
				adminListLoader: function(adminProviderService) {
					return adminProviderService();
				},
			},
			access: { requiredLogin: true }
		})

		.when('/admin/draft/reader', {
			templateUrl: '../../views/draftReader.html',
			controller: 'draftReaderController',
			resolve: {
				draftFromDB: function(draftFromDBLoader) {
					return draftFromDBLoader();
				},				
			},
			access: { requiredLogin: true }
		})

		
		/**********************************************************************************************************************/



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


		.when('/admin/links/selector', {
			templateUrl: '../../views/admin/procedureSelection.html',
			controller: 'linksSelectorController',
			resolve: {
				multiTrashProcLoader: function(multiTrashProcedureLoader) {
					return multiTrashProcedureLoader();
				}
			},
			access: { requiredLogin: true }	
		})



		.when('/admin/procedure/revert', {
			templateUrl: '../../views/admin/procedureRevList.html',
			controller: 'procedureRevListController',
			resolve: {
				procedureDBLoader: function(procedureFromDBLoader) {
					return procedureFromDBLoader();
				},
				versionList: function(versionList) {
					return versionList();
				},
				existingDraft: function(draftFromDBLoader) {
					return draftFromDBLoader();
				},
				baselineObj: function(versionNumberLoader) {
					return versionNumberLoader();
				}				
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

		.when('/admin/links', {
			templateUrl: '../../views/admin/linksResolve.html',
			controller: 'linksResolveController',
			access: { requiredLogin: true }	
		})


		.when('/admin/approvals', {
			templateUrl: '../../views/admin/approvals.html',
			controller: 'approveRejectListController',
			resolve: {
				multiDraftLoader: function(multiDraftLoader) {
					return multiDraftLoader();
				},				
				adminListLoader: function(adminProviderService) {
					return adminProviderService();
				},
			},
			access: { requiredLogin: true }	
		})

		.when('/admin/rejected', {
			templateUrl: '../../views/admin/rejections.html',
			controller: 'approveRejectListController',
			resolve: {
				multiDraftLoader: function(multiDraftLoader) {
					return multiDraftLoader();
				},
				adminListLoader: function(adminProviderService) {
					return adminProviderService();
				},
			},
			access: { requiredLogin: true }	
		})

		.when('/admin/fail-selection', {
			templateUrl: '../../views/admin/status/fail-selector-apply.html',
			access: { requiredLogin: true }	
		})

		.when('/admin/fail-draft-add', {
			templateUrl: '../../views/admin/status/fail-draft-add.html',
			access: { requiredLogin: true }	
		})

		.when('/admin/fail-draft-update', {
			templateUrl: '../../views/admin/status/fail-draft-update.html',
			access: { requiredLogin: true }	
		})

		.when('/admin/fail-procedure-update', {
			templateUrl: '../../views/admin/status/fail-procedure-update.html',
			access: { requiredLogin: true }	
		})
		
		.when('/admin/sucess-draft-add', {
			templateUrl: '../../views/admin/status/sucess-draft-add.html',
			access: { requiredLogin: true }	
		})

		.when('/admin/sucess-draft-update', {
			templateUrl: '../../views/admin/status/sucess-draft-update.html',
			access: { requiredLogin: true }	
		})

		.when('/admin/sucess-procedure-update', {
			templateUrl: '../../views/admin/status/sucess-procedure-update.html',
			access: { requiredLogin: true }	
		})


		.when('/admin/sucess-draft-approve', {
			templateUrl: '../../views/admin/status/sucess-draft-approve.html',
			access: { requiredLogin: true }	
		})
		
		.when('/admin/fail-draft-approve', {
			templateUrl: '../../views/admin/status/fail-draft-approve.html',
			access: { requiredLogin: true }	
		})

		.when('/admin/sucess-draft-reject', {
			templateUrl: '../../views/admin/status/sucess-draft-reject.html',
			access: { requiredLogin: true }	
		})
		
		.when('/admin/fail-draft-reject', {
			templateUrl: '../../views/admin/status/fail-draft-reject.html',
			access: { requiredLogin: true }	
		})

		.when('/admin/sucess-draft-remove', {
			templateUrl: '../../views/admin/status/sucess-draft-remove.html',
			access: { requiredLogin: true }	
		})
		
		.when('/admin/fail-draft-remove', {
			templateUrl: '../../views/admin/status/fail-draft-remove.html',
			access: { requiredLogin: true }	
		})

		.when('/admin/locked', {
			templateUrl: '../../views/admin/status/fail-lock.html',
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

