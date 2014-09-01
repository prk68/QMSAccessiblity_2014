var mod = angular.module('qmsAdminApp', ['ngRoute', 'appAdminRoutes', 'ngCkeditor', 'defaultProcedureServiceModule', 'procedureCRUDCtrlModule', 'editProcedureSelectorModule', 'dBProcedureServiceModule', 'deleteProcedureSelectorModule', 'ngSanitize']);


mod.factory('authService', function($http, $window) {
    return {
        logIn: function(username, password) {
            return $http.post('/login', {username: username, password: password});
        },
 
        logOut: function() {
          $window.sessionStorage.validated = "false"
          $window.sessionStorage.username = ""
        }
    }
});



mod.controller('loginController', function($scope, $location, authService, $window){


	$scope.profile = {alias:'alias', password:''};

	console.log('costaaaaaaaaaaaa')

	$scope.login = function(){


		authService.logIn($scope.profile.alias, $scope.profile.password).success(function(data){
      console.log(data)
			$window.sessionStorage.token = data.token
      $window.sessionStorage.validated = "true"
      $window.sessionStorage.username = $scope.profile.alias
			$location.path('/admin/home')
			console.log('sucesssssssssss')
      console.log($window.sessionStorage.token)

		}).error(function(status, data) {
            console.log('errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
            $window.sessionStorage.validated = "false"
            $window.sessionStorage.username = ""

            alert("Invalid credential or access rights")
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

mod.run(['$rootScope', '$location',  'authService', '$window', function($rootScope, $location, authService, $window) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
        console.log($window.sessionStorage)
        console.log(nextRoute.$$route.access)
        if (nextRoute.originalPath == "/admin/logout") {
            console.log('outtttttttttttttttttttttttttttttttttttttttttttttttttttttttttt')
            authService.logOut()
            console.log($window.sessionStorage)
            $location.path("/admin/login");
        }

        else if (nextRoute.$$route.access.requiredLogin === true && $window.sessionStorage.validated != "true") {
            $location.path("/admin/login");
        }

    });
}]);