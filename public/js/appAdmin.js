var mod = angular.module('qmsAdminApp', ['ngRoute', 'appAdminRoutes', 'ngCkeditor', 'ui.bootstrap', 'validateDraft', 'draftReaderModule', 'linksResolveModule', 'linksSelectorModule', 
        'defaultProcedureServiceModule', 'deadLinksLogModule', 'approveRejectListModule', 'procedureCRUDCtrlModule', 'procedureFormModule', 'editProcedureSelectorModule',
        'procedureRevListCtrl','activityLogModule','revertProcedureSelectorModule', 'dBProcedureServiceModule', 'trashCanCtrlModule','adminProvider', 'deleteProcedureSelectorModule', 
        'ngSanitize', 'fileModelModule', 'fileUploadModule', 'imagesCtrlModule', 'galleryModule']);


mod.factory('authService', function($http, $window) {
    return {
        logIn: function(username, password) {
            console.log("entered login")
            return $http.post('/login', {username: username, password: password});
        },
 
        logOut: function() {
          $window.sessionStorage.validated = "false"
          $window.sessionStorage.username = ""
        }
    }
});


mod.controller('loginController', function($scope, $location, authService, $window){



	$scope.profile = {alias:'', password:''};
  $scope.showErr = false;
	console.log('costaaaaaaaaaaaa')
  $scope.entered   = false
	$scope.login = function(){


		authService.logIn($scope.profile.alias, $scope.profile.password).success(function(data){
      console.log(data)
			$window.sessionStorage.token = data.token
      $window.sessionStorage.validated = "true"
      $window.sessionStorage.username = $scope.profile.alias
      $scope.entered  = true;
			$location.path('/admin/home')
			console.log('sucesssssssssss')
      console.log($window.sessionStorage.token)

		}).error(function(status, data) {
            console.log('errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
            $window.sessionStorage.validated = "false"
            $window.sessionStorage.username = ""

            $scope.showErr = true;
            console.log($scope.showErr)
        });	
			
	}
})


mod.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        // handle the case where the user is not authenticated
      }
      return response || $q.when(response);
    }
  };
});

mod.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});

mod.run(['$rootScope', '$location',  'authService', '$window', function($rootScope, $location,  authService, $window) {
    $rootScope.validated = ( $window.sessionStorage.validated == "true")

    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
        console.log($window.sessionStorage)
        console.log(nextRoute)
        if (nextRoute.originalPath == "/admin/logout") {
            console.log('outtttttttttttttttttttttttttttttttttttttttttttttttttttttttttt')
            authService.logOut()
            console.log($window.sessionStorage)
            $location.path("/admin/login");
        }

         if (nextRoute.originalPath == "/admin" && $window.sessionStorage.validated == "true") {
            $location.path("/admin/home");
        }

        else if (nextRoute.$$route.access.requiredLogin === true && $window.sessionStorage.validated != "true") {
            console.log("ghumm")
            console.log($window.sessionStorage.validated)
              $location.path("/admin/login");
        }

    });
}]);