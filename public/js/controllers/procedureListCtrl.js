
var procedureListCtrlModule = angular.module('procedureListCtrlModule', [])

procedureListCtrlModule.controller('procedureListController', function($scope, $http, multiProcLoader){
	console.log('lalalalala')
	$scope.procedures =[]
	for(i=0; i<multiProcLoader.length; ++i)
		if(multiProcLoader[i].trashed == false)
			$scope.procedures.push(multiProcLoader[i])
	})