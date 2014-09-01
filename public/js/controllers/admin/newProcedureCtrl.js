

var procedureCRUDCtrlModule = angular.module('procedureCRUDCtrlModule', [])
var tempProcedure = {}

procedureCRUDCtrlModule.controller('procedureCRUDController', function($scope, $http, $location, $routeParams, procedureDefaultInitializer, procedureDBLoader) {

	console.log($routeParams.id)

	if($routeParams.id)
	{		
		$scope.edit = true
		$scope.url_extension = '?id='+$routeParams.id
		if(Object.keys(tempProcedure).length == 0)
			tempProcedure = procedureDBLoader
		$scope.procedure = tempProcedure;
	}
		
	else
	{
		$scope.edit = false
		$scope.url_extension = ''
		$scope.procedure = procedureDefaultInitializer;
	}
	
	syncModel = function() {

		if($scope.edit)
			tempProcedure = $scope.procedure
		else
			procedureDefaultInitializer = $scope.procedure
	}
	


	$scope.preview = function(){
		$location.path('/admin/procedurecrud/preview')
	}

	$scope.uploadProcedure = function(){
				
		var postData = {procedure:$scope.procedure};	
		var postURL = ""

		if($scope.edit)
			postURL = "/procedure/update"
	
		else
			postURL = "/procedure/add"
		


		console.log($scope.procedure.content)
		$http.post(postURL, postData).success(function(data, status, headers, config) {
				console.log("sucess");
				$location.path('/admin/sucess-procedure-add')
						
		}).error(function(data, status, headers, config) {
			console.log("fail");
			$location.path('/admin/fail-procedure-add')
		});
	};

	$scope.setLocal = function(){
		$scope.procedure.global = false;
		console.log('global is ' + $scope.procedure.global)
	};

	$scope.setGlobal = function(){
		$scope.procedure.global = true;
		console.log('global is ' + $scope.procedure.global)
	};

	$scope.$watch('procedure', syncModel, true);

})































