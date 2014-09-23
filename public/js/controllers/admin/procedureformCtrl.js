 var module = angular.module('procedureFormModule', []);


 module.controller('procedureFormController', function($scope, initializer, adminListLoader, versionList, existingDraft, validateDraft, $window, $http, $location, $route){
 	
 	//Fill the procedure with the fields from provider  
	$scope.procedure = initializer;
	console.log(versionList)
	// Functions to manage switching phases
	$scope.step = "init"
	$scope.step_init = function(){$scope.step = "init"}
	$scope.step_map = function(){$scope.step = "map"}
	$scope.step_content = function(){$scope.step = "content"}
	$scope.step_preview = function(){$scope.step = "preview"}
	$scope.step_submit = function(){$scope.step = "submit"}
	$scope.isActive = function(arg){return (arg==$scope.step)}

	//Load qms admins for the combo box	
	$scope.admins = adminListLoader.admins

	//Store the current version for editing mode
	$scope.active_version = $scope.procedure.version

	$scope.buttonText = $scope.procedure.mappings.global ? "Local" : "Global"
	
	if($route.current.$$route.originalPath.match(/^\/admin\/edit/))
		$scope.edit = true
	
	else if($route.current.$$route.originalPath.match(/^\/admin\/draft/))
		$scope.draft = true
		
	
	if(existingDraft.pid && $scope.edit)
 		$location.path('/admin/locked')

	$scope.setGlobal = function(){
		
		$scope.procedure.mappings.global = !$scope.procedure.mappings.global
		if($scope.buttonText == "Local")
			$scope.buttonText = "Global"
		else
			$scope.buttonText = "Local"
	};

	$scope.preview = function(){
		$location.path('/admin/procedurecrud/preview')
	}

	$scope.submitDraft = function(){
		$scope.errors = validateDraft.validateFields($scope.procedure)
		if($scope.errors.length > 0)
		{
			$scope.showSubmitError = true
			return;
		}
		else
		{
			$http.get('/admin/exists/all/'+$scope.procedure.pid).success(function(data)
			{
			
				if(data.exists && !$scope.edit && !$scope.draft)
				{
					$scope.showSubmitError = true
					$scope.errors.push("An artifact or a draft with this id already exists")
				}
				else
				{
					if(versionList.versions && versionList.versions.indexOf($scope.procedure.version) != -1)
					{
						$scope.showSubmitError = true
						$scope.errors.push("The version id is not unique within the artifact")
					}
					else
					{
						var postUrl = ($scope.draft) ? '/admin/draft/update' : '/admin/draft/submit'
						$scope.procedure.metaData.owner = $window.sessionStorage.username
						var draftType =  (($scope.edit) ? "edit" : "new")
						$http.post(postUrl,{procedure:$scope.procedure, draft_type:draftType}).then(function(){
							if($scope.edit)
								$location.path('/admin/sucess-procedure-update')
							else if($scope.draft)
								$location.path('/admin/sucess-draft-update')
							else
								$location.path('/admin/sucess-draft-add')
						}, function(){
							if($scope.edit)
								$location.path('/admin/fail-procedure-update')
							else if($scope.draft)
								$location.path('/admin/fail-draft-update')
							else
								$location.path('/admin/fail-draft-add')
						});
					}
				}
			})
		}
	}

})