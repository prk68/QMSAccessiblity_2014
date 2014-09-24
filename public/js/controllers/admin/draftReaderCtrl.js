 var module = angular.module('draftReaderModule', []);


 module.controller('draftReaderController', function($scope, $sce, draftFromDB, $location, $http, $window){

 	$scope.procedure = draftFromDB;
 	console.log($scope.procedure)
	$scope.mappings = {role:[], phase:[], center:[]}
	$scope.html = $sce.trustAsHtml($scope.procedure.data.content);

	$scope.isReviewer = function(){return $scope.procedure.metaData.reviewer.toUpperCase() ==  $window.sessionStorage.username.toUpperCase()}
	$scope.isOwner    = function(){return $scope.procedure.metaData.owner.toUpperCase() ==  $window.sessionStorage.username.toUpperCase()}
	
	if($scope.procedure.mappings.role.pfl)
		$scope.mappings.role.push('Portfolio')
	if($scope.procedure.mappings.role.eng)
		$scope.mappings.role.push('Engineering')
	if($scope.procedure.mappings.role.cmz)
		$scope.mappings.role.push('Commercialization')
	if($scope.procedure.mappings.role.ops)
		$scope.mappings.role.push('Operations')
	if($scope.procedure.mappings.role.qlty)
		$scope.mappings.role.push('Quality')
	if($scope.procedure.mappings.role.sup)
		$scope.mappings.role.push('Support')

	$scope.roles = $scope.mappings.role.join("|")

	if($scope.procedure.mappings.phase.incp)
		$scope.mappings.phase.push('Inception')
	if($scope.procedure.mappings.phase.elb)
		$scope.mappings.phase.push('Elaboration')
	if($scope.procedure.mappings.phase.constr)
		$scope.mappings.phase.push('Construction')
	if($scope.procedure.mappings.phase.beta)
		$scope.mappings.phase.push('Beta')
	if($scope.procedure.mappings.phase.cmz)
		$scope.mappings.phase.push('Commercialization')

	$scope.phases = $scope.mappings.phase.join("|")

	if($scope.procedure.mappings.center.abtc)
		$scope.mappings.center.push('abtc')
	if($scope.procedure.mappings.center.atc)
		$scope.mappings.center.push('atc')
	if($scope.procedure.mappings.center.brgc)
		$scope.mappings.center.push('brgc')
	if($scope.procedure.mappings.center.htc)
		$scope.mappings.center.push('htc')
	if($scope.procedure.mappings.center.mptc)
		$scope.mappings.center.push('mptc')
	if($scope.procedure.mappings.center.ntc)
		$scope.mappings.center.push('ntc')
	if($scope.procedure.mappings.center.ptc)
		$scope.mappings.center.push('ptc')

	$scope.centers = $scope.mappings.center.join("|")
	$scope.showCommentsBox = false
	$scope.rejectionCmnts = ""

	$scope.activateCommentsBox = function(){$scope.showCommentsBox = true}

	$scope.approve = function(){

		$http.post('/admin/approve/', {pid:$scope.procedure.pid}).then(function() {
			$location.path('/admin/sucess-draft-approve')

		}, function(){
			$location.path('/admin/fail-draft-approve')
		})

	}

	$scope.reject = function(){

		$http.post('/admin/reject', {pid:$scope.procedure.pid, remarks: $scope.rejectionCmnts}).then(function() {
			$location.path('/admin/sucess-draft-reject')

		}, function(){
			$location.path('/admin/fail-draft-reject')
		})		
	}

	$scope.discard = function(){

		$http.post('/admin/draft/remove', {pid:$scope.procedure.pid}).then(function() {
			$location.path('/admin/sucess-draft-remove')

		}, function(){
			$location.path('/admin/fail-draft-remove')
		})		
	}

	$scope.rework = function(){

		$location.path('/admin/draft/form').search({id:$scope.procedure.pid});
	}	

})