var mod = angular.module('popupfilterModule', [])

mod.controller('popupfilterController', function($scope, multiProcLoader, query, $routeParams,  $modalInstance){

	$scope.results =[]
	console.log(query)

	for(i=0; i<multiProcLoader.length; ++i)
	{
		if(query == "incp" && multiProcLoader[i].mappings.phase.incp)
			$scope.results.push(multiProcLoader[i])
		
		else if(query == "elb" && multiProcLoader[i].mappings.phase.elb)
			$scope.results.push(multiProcLoader[i])

		else if(query == "constr" && multiProcLoader[i].mappings.phase.constr)
			$scope.results.push(multiProcLoader[i])

		else if(query == "beta" && multiProcLoader[i].mappings.phase.beta)
			$scope.results.push(multiProcLoader[i])

		else if(query == "cmz" && (multiProcLoader[i].mappings.phase.cmz || multiProcLoader[i].mappings.role.cmz))
			$scope.results.push(multiProcLoader[i])

		else if(query == "pfl" && multiProcLoader[i].mappings.role.pfl)
			$scope.results.push(multiProcLoader[i])

		else if(query == "eng" && multiProcLoader[i].mappings.role.eng)
			$scope.results.push(multiProcLoader[i])

		else if(query == "ops" && multiProcLoader[i].mappings.role.ops)
			$scope.results.push(multiProcLoader[i])

		else if(query == "qlty" && multiProcLoader[i].mappings.role.qlty)
			$scope.results.push(multiProcLoader[i])

		else if(query == "sup" && multiProcLoader[i].mappings.role.sup)
			$scope.results.push(multiProcLoader[i])

	}


	$scope.ok = function(){
		 $modalInstance.close();
	}
})