
var procedureListCtrlModule = angular.module('procedureListCtrlModule', [])

procedureListCtrlModule.controller('procedureListController', function($scope, $http, multiProcLoader){
	$scope.results =multiProcLoader
	console.log($scope.results)
	for(i=0; i<$scope.results.length; ++i)
		$scope.results[i].show = true
	
	$scope.ldt = null;
    $scope.udt = null;
 
  $scope.openL = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.openedL = true;
  };

  $scope.openU = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.openedU = true;
  };

  $scope.filterByDate = function(){

  	for(i=0; i<$scope.results.length; ++i)
		$scope.results[i].show = true

	if(!$scope.ldt || !$scope.udt)
		return;
	
	for(i=0; i<$scope.results.length; ++i)
	{
		$scope.results[i].show = false

		var val = (new Date($scope.results[i].date_of_modification)).valueOf()

		if($scope.ldt.valueOf() <= val &&  val <= $scope.udt.valueOf())
			$scope.results[i].show = true		
	}	
  }

})