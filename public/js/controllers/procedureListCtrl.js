
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

  $scope.showDateFilterForm = false
  $scope.showDateFilter = function(){
  	$scope.showDateFilterForm = !$scope.showDateFilterForm
  }

  $scope.filterByDate = function()
  {

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


  $scope.step = "all"
  $scope.step_all = function()
                    {
                      $scope.step = "all"
                      for(i=0; i<$scope.results.length; ++i)
                         $scope.results[i].show = true
                    }


  $scope.step_pfl = function()
                    {
                      $scope.step = "pfl"
                      for(i=0; i<$scope.results.length; ++i)
                        $scope.results[i].show = $scope.results[i].mappings.role.pfl
                    }


  $scope.step_eng = function()
                    {
                      $scope.step = "eng"
                      for(i=0; i<$scope.results.length; ++i)
                         $scope.results[i].show = $scope.results[i].mappings.role.eng
                    }


  $scope.step_cmz = function()
                    {
                        $scope.step = "cmz"
                        for(i=0; i<$scope.results.length; ++i)
                         $scope.results[i].show = $scope.results[i].mappings.role.cmz
                    }

  $scope.step_ops = function()
                    {
                        $scope.step = "ops"
                        for(i=0; i<$scope.results.length; ++i)
                          $scope.results[i].show = $scope.results[i].mappings.role.ops
                    }


  $scope.step_sup = function()
                    {
                      $scope.step = "sup"
                      for(i=0; i<$scope.results.length; ++i)
                          $scope.results[i].show = $scope.results[i].mappings.role.sup
                    }

  $scope.step_qlty = function()
                     {
                        $scope.step = "qlty"
                        for(i=0; i<$scope.results.length; ++i)
                           $scope.results[i].show = $scope.results[i].mappings.role.qlty
                    }


  $scope.isActive = function(arg){return (arg==$scope.step)}
})