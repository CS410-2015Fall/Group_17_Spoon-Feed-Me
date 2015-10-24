app.controller('SearchController', ['$scope','$http',function($scope, $http) {

	// 45.55.223.121

	$scope.txt = "Nothing!";

	$scope.searchRecipes = function() {
		$http.get("http://45.55.223.121/customers").then(function(resp) {
			console.log('Success',resp.data);
			$scope.txt = resp.data;
		}, function(err) {
			console.log('ERR',err.status);
		})
	}
}]);