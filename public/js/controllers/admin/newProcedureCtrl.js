

var procedureCRUDCtrlModule = angular.module('procedureCRUDCtrlModule', [])
var editedProcedure = {}


isValidProcedure = function (procedure, $http)
{
	console.log(procedure)
	console.log('isValidProcedure')
	isValidProcedure.errors = [];
	isValid = true;
	
	if(!procedure.pid || procedure.pid.length == 0){
		isValidProcedure.errors.push("procedure Id is empty.")
		isValid = false;
	}
	

	if(!procedure.versions[procedure.baseline].pname || procedure.versions[procedure.baseline].pname.length == 0){
		isValidProcedure.errors.push("procedure name is empty.")
		isValid = false;
	}


	if(!procedure.versions[procedure.baseline].pname || procedure.versions[procedure.baseline].pname.length == 0){
		isValidProcedure.errors.push("procedure Name is empty.")
		isValid = false;
	}
	
	if(!angular.isNumber(procedure.versions[procedure.baseline].nversion)){
		console.log('version')
		isValidProcedure.errors.push("Version must be numeric.")
		isValid = false;
	}

	if(!procedure.versions[procedure.baseline].content || procedure.versions[procedure.baseline].content.length == 0){
		isValidProcedure.errors.push("Procedure has no content. Cannot create such procedures.")
		isValid = false;
	}
	
	var addedVersion = procedure.versions[procedure.baseline].nversion
	for(i=0; i<procedure.versions.length-1; ++i)
	{
		if(procedure.versions[i].nversion === addedVersion)
		{
			console.log(addedVersion)
			isValidProcedure.errors.push("Version is not unique with in the procedure")
			isValid = false;
			break;
		}
	}
	return isValid;
}

procedureCRUDCtrlModule.controller('procedureCRUDController', function($scope, $http, $location, $routeParams, procedureDefaultInitializer, procedureDBLoader, adminListLoader, $window) {

	console.log('enterereed')
	console.log($routeParams.id)
	$scope.admins = adminListLoader.admins
	$scope.showSubmitError = false;
	$scope.errors = [];

	if($routeParams.id)
	{		
		$scope.edit = true
		$scope.url_extension = '?id='+$routeParams.id
		if(Object.keys(editedProcedure).length == 0)
		{
			angular.copy(procedureDBLoader, editedProcedure);
			editedProcedure.versions.push({})
			angular.copy(editedProcedure.versions[editedProcedure.baseline], editedProcedure.versions[editedProcedure.versions.length-1]);
			editedProcedure.orig_baseline = editedProcedure.baseline
			editedProcedure.baseline = editedProcedure.versions.length-1;
		}

		$scope.procedure = editedProcedure;			
		console.log($scope.procedure)
	}	
		
	else
	{
		$scope.edit = false
		$scope.url_extension = ''
		$scope.procedure = procedureDefaultInitializer;
		procedureDefaultInitializer.orig_baseline = procedureDefaultInitializer.baseline
		console.log($scope.procedure.versions[$scope.procedure.baseline].global)
	}
	
	syncModel = function() {

		if($scope.edit)
			editedProcedure = $scope.procedure
		else
			procedureDefaultInitializer = $scope.procedure
	}
	


	$scope.preview = function(){
		$location.path('/admin/procedurecrud/preview')
	}

	$scope.uploadProcedure = function(){

		if($scope.edit)
		{
			$scope.postData()	
		}
		else
		{
			$http.get('/procedures/'+$scope.procedure.pid).then(function(data) {
				if(!$scope.edit){
	  				$scope.showSubmitError = true;
					$scope.errors.push("An artifact already exists with the same procedure id")
				}
			}, function() { 
				$scope.postData()		
			})	
		}		
	};

	$scope.postData = function(){
		if(isValidProcedure($scope.procedure, $http)){
				var postURL = ""
				$scope.procedure.versions[$scope.procedure.baseline].owner = $window.sessionStorage.username;
				if($scope.edit)
					postURL = "/procedure/update"
				else
					postURL = "/procedure/add"
			
				console.log('gggggggggggggggggggggggggggggggggggggggggggggggggg')
				console.log($scope.procedure)

				var postData = {procedure:$scope.procedure};
				console.log($scope.procedure.content)
				$http.post(postURL, postData).success(function(data, status, headers, config) {
						console.log("sucess");
						$location.path('/admin/sucess-procedure-add')
								
				}).error(function(data, status, headers, config) {
					console.log("fail");
					$location.path('/admin/fail-procedure-add')
				})
			}
			else
			{
				$scope.showSubmitError = true;
				$scope.errors = isValidProcedure.errors;
			}	
	}

	$scope.setGlobal = function(){
		console.log('globallllllllllllllllllllllllllllll')
		$scope.procedure.versions[$scope.procedure.baseline].global = !$scope.procedure.versions[$scope.procedure.baseline].global;
		console.log('global is ' + $scope.procedure.versions[$scope.procedure.baseline].global)
	};

	$scope.$watch('procedure', syncModel, true);

})































