angular.module('SpoonFeedMe.controllers', [])

.controller('SearchCtrl', function($scope, RecipeService) {
  $scope.content="";

  $scope.getRecipes = function(searchTerms) {
    RecipeService.getFromSearch(searchTerms).then(function (recipeData) {
      $scope.content = recipeData;
  })};

})

.controller('SavedCtrl', function($scope, RecipeService) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.saved = RecipeService.all();
  $scope.remove = function(recipe) {
    RecipeService.remove(recipe);
  };
})

.controller('SavedDetailCtrl', function($scope, $stateParams, RecipeService) {
  $scope.single = RecipeService.get($stateParams.recipeId);
  $scope.instructions = RecipeService.get($stateParams.recipeId).instructions;
})
