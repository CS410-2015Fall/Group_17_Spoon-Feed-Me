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
  $scope.recipeId = $stateParams.recipeId;
  $scope.single = RecipeService.get($stateParams.recipeId);
  $scope.instructions = RecipeService.get($stateParams.recipeId).instructions;
  $scope.fromSavedOrSearch = "saved";

  $scope.toWalkthrough = function(title) {
  };

})

.controller('WalkthroughCtrl', function($scope, $stateParams, $ionicHistory, RecipeService) {
  $scope.recipeId = $stateParams.recipeId;
  if($stateParams.fromSavedOrSearch == "saved") {
    $scope.recipe = RecipeService.get($stateParams.recipeId);
  } else if($stateParams.fromSavedOrSearch == "search") {
    var searchPayload = RecipeService.getSearchPayload();
    $scope.recipe = searchPayload[$scope.recipeId];
  }

  $scope.currentStepNum = 1;
  $scope.currentStep = $scope.recipe.instructions[$scope.currentStepNum-1];
  $scope.maxStepNum = $scope.recipe.instructions.length;

  $scope.nextStep = function() {

    $scope.currentStepNum+=1;
    $scope.currentStep = $scope.recipe.instructions[$scope.currentStepNum-1];

  }

  $scope.prevStep = function() {

    $scope.currentStepNum-=1;
    $scope.currentStep = $scope.recipe.instructions[$scope.currentStepNum-1];

  }

  $scope.goBack = function() {
    $ionicHistory.goBack();
  }

})

.controller('SearchDetailCtrl', function($scope, $stateParams, RecipeService) {
  $scope.recipeId = $stateParams.recipeId;
  var searchPayload = RecipeService.getSearchPayload();
  $scope.single = searchPayload[$stateParams.recipeId];
  $scope.instructions = searchPayload[$stateParams.recipeId].instructions;
  $scope.fromSavedOrSearch = "search";
})
