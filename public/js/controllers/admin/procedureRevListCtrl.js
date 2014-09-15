 

 var module = angular.module('procedureRevListCtrl', []);
 var defComments = "Enter a brief comment on why you want to revert to this version.."

 module.controller('procedureRevListController', function($scope, $http, $location, $route, procedureDBLoader, $window){
 	console.log('holllllllllaaaaaaa')
	$scope.procedure = procedureDBLoader
	$scope.showMsgSuc = false;
	$scope.showMsgFail = false;
	$scope.comments = defComments

	console.log($scope.procedure)

	$scope.consultActivated = false;
	$scope.selectedVersion = $scope.procedure.basline

	$scope.consultProcedure = function(nver) {
								$scope.consultActivated = true;
								for(i=0; i<$scope.procedure.versions.length; ++i)
								{
									if($scope.procedure.versions[i].nversion == nver ){
										$scope.selectedVersion = i
										break;
									}
								}

								$scope.mappings = []
								if($scope.procedure.versions[$scope.selectedVersion].role.pfl)
									$scope.mappings.push('Portfolio')
								if($scope.procedure.versions[$scope.selectedVersion].role.eng)
									$scope.mappings.push('Engineering')
								if($scope.procedure.versions[$scope.selectedVersion].role.cmz)
									$scope.mappings.push('Commercialization')
								if($scope.procedure.versions[$scope.selectedVersion].role.ops)
									$scope.mappings.push('Operations')
								if($scope.procedure.versions[$scope.selectedVersion].role.qlty)
									$scope.mappings.push('Quality')
								if($scope.procedure.versions[$scope.selectedVersion].role.sup)
									$scope.mappings.push('Support')

								if($scope.procedure.versions[$scope.selectedVersion].phase.incp)
									$scope.mappings.push('Inception')
								if($scope.procedure.versions[$scope.selectedVersion].phase.elab)
									$scope.mappings.push('Elaboration')
								if($scope.procedure.versions[$scope.selectedVersion].phase.constr)
									$scope.mappings.push('Construction')
								if($scope.procedure.versions[$scope.selectedVersion].phase.beta)
									$scope.mappings.push('Beta')
								if($scope.procedure.versions[$scope.selectedVersion].phase.cmz)
									$scope.mappings.push('Commercialization')
								

								if($scope.procedure.versions[$scope.selectedVersion].center.abtc)
									$scope.mappings.push('abtc')
								if($scope.procedure.versions[$scope.selectedVersion].center.atc)
									$scope.mappings.push('atc')
								if($scope.procedure.versions[$scope.selectedVersion].center.brgc)
									$scope.mappings.push('brgc')
								if($scope.procedure.versions[$scope.selectedVersion].center.htc)
									$scope.mappings.push('htc')
								if($scope.procedure.versions[$scope.selectedVersion].center.mptc)
									$scope.mappings.push('mptc')
								if($scope.procedure.versions[$scope.selectedVersion].center.ntc)
									$scope.mappings.push('ntc')
								if($scope.procedure.versions[$scope.selectedVersion].center.ptc)
									$scope.mappings.push('ptc')

								$scope.mappings = $scope.mappings.concat($scope.procedure.versions[$scope.selectedVersion].question)
								$scope.mappings = $scope.mappings.join(';')				

													
							}


	$scope.revertProcedure = function(nver) {

								var oldBaseline = $scope.procedure.baseline
							
								for(i=0; i<$scope.procedure.versions.length; ++i)
								{
									if($scope.procedure.versions[i].nversion == nver ){
										$scope.procedure.baseline = i
										break;
									}
								}

								var cmnts =  $scope.comments == defComments ? "" : $scope.comments

								$http.post('/admin/revert', {pid:$scope.procedure.pid,
									pname: $scope.procedure.versions[$scope.procedure.baseline].pname,
									baseline:$scope.procedure.baseline, 
									owner:$window.sessionStorage.username, 
									old_version: $scope.procedure.versions[oldBaseline].nversion,
									new_version: $scope.procedure.versions[$scope.procedure.baseline].nversion,
									comments:cmnts
								}).success(function(){$route.reload()
								})
																			
						}

})