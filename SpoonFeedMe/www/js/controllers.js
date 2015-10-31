angular.module('SpoonFeedMe.controllers', [])


// Controller for SpeechRecognition object creation
.controller('VoiceCtrl', function($scope, $stateParams) {

  ionic.Platform.ready(function(){
    // alert("Creating speech recognition handler...");
    $scope.recognition = new SpeechRecognition();
  });

})


// Controller for recipe search
.controller('SearchCtrl', function($scope, $ionicLoading, RecipeService) {

  $scope.content="";
  $scope.getRecipes = function(searchTerms) {
    $ionicLoading.show({
      template: '<ion-spinner icon="android"></ion-spinner>',
      animation: 'fade-in'
    });

    RecipeService.getFromSearch(searchTerms).then(function (recipeData) {
      $scope.content = recipeData;
      $ionicLoading.hide();
    });
  }
})


// Contoller for saved recipes
.controller('SavedCtrl', function($scope, RecipeService) {

  $scope.saved = RecipeService.allRecipesFromSaved();
  $scope.remove = function(recipe) {
    RecipeService.removeRecipeFromSaved(recipe);
  };

})


// Controller for individual recipe details
.controller('RecipeDetailCtrl', function($scope, $stateParams, RecipeService) {

  $scope.recipeId = $stateParams.recipeId;
  $scope.fromSavedOrSearch = $stateParams.fromSavedOrSearch;
  var payload = RecipeService.getRecipes($scope.fromSavedOrSearch)[$scope.recipeId];
  $scope.single = payload;
  $scope.instructions = payload.instructions;

})


// Controller for recipe instruction walkthrough
.controller('WalkthroughCtrl', function($scope, $stateParams, $ionicHistory, RecipeService) {

  $scope.recipeId = $stateParams.recipeId;
  if($stateParams.fromSavedOrSearch == "saved") {
    $scope.recipe = RecipeService.getRecipeFromSaved($stateParams.recipeId);
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

  $scope.$on("$ionicView.beforeEnter", function() {

    $scope.recognition.onresult = function(event) {
      if (event.results.length > 0) {
        var heardValue = event.results[0][0].transcript;
        if(heardValue == "next") {
          // alert("I heard next...");
          $scope.nextStep();
          $scope.$apply();
        } else if(heardValue == "back") {
          // alert("I heard back...");
          $scope.prevStep();
          $scope.$apply();
        } else if(heardValue == "read") {
          // Call to text to speech plugin
        }
      }
    }
    alert("Starting voice recognition...");
    $scope.recognition.start();

  });

  $scope.$on("$ionicView.beforeLeave", function() {

    alert("Stopping voice recognition...");
    $scope.recognition.abort();

  });

})
