angular.module('SpoonFeedMe.controllers', [])

.controller('SearchCtrl', function($scope, $ionicLoading, RecipeService) {
  $scope.content="";
  $scope.getRecipes = function(searchTerms) {
    $ionicLoading.show({
      template: '<ion-spinner icon="android"></ion-spinner>',
      animation: 'fade-in'
    })
    RecipeService.getFromSearch(searchTerms).then(function (recipeData) {
      $scope.content = recipeData;
      $ionicLoading.hide()
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

  var recognition;

  $scope.$on("$ionicView.beforeEnter", function() {
    alert("Starting voice recognition...");
    recognition = new SpeechRecognition();
    recognition.onresult = function(event) {
        if (event.results.length > 0) {
          var heardValue = event.results[0][0].transcript;
          if(heardValue == "next") {
            alert("I heard next...");
            $scope.nextStep();
            $scope.$apply();
          } else if(heardValue == "previous") {
            alert("I heard previous...");
            $scope.prevStep();
            $scope.$apply();
          }
        }
    }
    recognition.start();
  });

  $scope.$on("$ionicView.beforeLeave", function() {
    alert("Stopping voice recognition...");
    recognition.abort();
  });

})

.controller('SearchDetailCtrl', function($scope, $stateParams, RecipeService) {
  $scope.recipeId = $stateParams.recipeId;
  var searchPayload = RecipeService.getSearchPayload();
  $scope.single = searchPayload[$stateParams.recipeId];
  $scope.instructions = searchPayload[$stateParams.recipeId].instructions;
  $scope.fromSavedOrSearch = "search";
})
