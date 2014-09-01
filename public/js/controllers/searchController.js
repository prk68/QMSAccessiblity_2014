var mod = angular.module('searchCtrlModule', [])

mod.controller('searchController', function($scope, $http, $routeParams){

	console.log("JJJJJJJJJJJJJJJ")

	console.log($routeParams.q)

	$scope.results = []

	function sortFunction(a, b)
	{
		return b.value-a.value

	}


	$http.get('/procedures/all').success(function(result, status, headers, config) {
			procedures = result;
			tokens = $routeParams.q.split(/\b\s+/)

			for(i=0; i<procedures.length; ++i)
			{
				ctnt = procedures[i].content.toLowerCase()
				score = 0
				hints = ""
				for(j=0; j<tokens.length; ++j)
				{
					indx = ctnt.indexOf(tokens[j].toLowerCase())
					if(ctnt != null && indx != -1)
					{
						++score
						hints = hints+ (procedures[i].content.substr(indx-2, indx+2)+"...")
					}
				}	

				if(score > 0)
					$scope.results.push({proc:procedures[i], value:score, suggest:hints})
			}

			$scope.results.sort(sortFunction)
			console.log($scope.results[0])
			$scope.result_count = $scope.results.length

	});

})