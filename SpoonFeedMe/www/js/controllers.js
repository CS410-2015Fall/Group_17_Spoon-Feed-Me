angular.module('SpoonFeedMe.controllers', ['ionic.utils'])
  // Controller for SpeechRecognition object creation
  .controller('VoiceCtrl', function($scope, $stateParams) {
    ionic.Platform.ready(function() {
      $scope.recognition = new SpeechRecognition();
    });
  })


  // Controller for recipe search
  .controller('SearchCtrl', function($scope, $ionicLoading, RecipeService) {
    $scope.content = "";

    $scope.getRecipes = function(searchTerms) {
      $ionicLoading.show({
        template: '<ion-spinner icon="android"></ion-spinner>',
        animation: 'fade-in'
      });
      RecipeService.getFromSearch(searchTerms).then(function(recipeData) {
        $scope.content = recipeData;
        $ionicLoading.hide();
      });
    }

    $scope.saveRecipe = function(recipe) {
      RecipeService.saveRecipe(recipe);
    }
  })


  // Contoller for saved recipes
  .controller('SavedCtrl', function($scope, RecipeService) {
    $scope.$on("$ionicView.beforeEnter", function() {
      $scope.saved = RecipeService.allRecipesFromSaved();
    });

    $scope.remove = function(recipe) {
      RecipeService.removeRecipeFromSaved(recipe);
    };
  })


  // Controller for individual recipe details
  .controller('RecipeDetailCtrl', function($scope, $stateParams, RecipeService) {
    $scope.recipeId = $stateParams.recipeId;
    $scope.fromSavedOrSearch = $stateParams.fromSavedOrSearch;
    var rate = 0.9;
    var payload = RecipeService.getRecipes($scope.fromSavedOrSearch)[$scope.recipeId];
    var images = RecipeService.getImages(payload.ingredients);
    var tempIngredients = {};

    for (i = 0; i < payload.ingredients.length; i++) {
      tempIngredients[payload.ingredients[i]] = "";
    }

    $scope.ingredients = tempIngredients;
    images.then(function(response) {
      $scope.ingredients = response;
    });

    $scope.single = payload;

    $scope.instructions = payload.instructions;
  })


  // Controller for recipe instruction walkthrough
  .controller('WalkthroughCtrl', function($scope, $stateParams, $ionicPopup,
    RecipeService) {
 
    // Some initial values
    $scope.recipeId = $stateParams.recipeId;
    var payload = RecipeService.getRecipes($stateParams.fromSavedOrSearch)[
      $scope.recipeId];
    $scope.recipe = payload;
    $scope.currentStepNum = 1;
    $scope.currentStep = $scope.recipe.instructions[$scope.currentStepNum - 1];
    $scope.maxStepNum = $scope.recipe.instructions.length;
    $scope.percentageThrough = ($scope.currentStepNum / $scope.maxStepNum) *
      100;
    $scope.max = ($scope.maxStepNum / $scope.maxStepNum) * 100;
  
    $scope.nextStep = function() {
      if ($scope.currentStepNum < $scope.maxStepNum) {
        $scope.currentStepNum += 1;
        $scope.currentStep = $scope.recipe.instructions[$scope.currentStepNum -
          1];
        $scope.percentageThrough = ($scope.currentStepNum / $scope.maxStepNum) *
          100;
      }
    }
  
    $scope.prevStep = function() {
      if ($scope.currentStepNum > 1) {
        $scope.currentStepNum -= 1;
        $scope.currentStep = $scope.recipe.instructions[$scope.currentStepNum -
          1];
        $scope.percentageThrough = ($scope.currentStepNum / $scope.maxStepNum) *
          100;
      }
    }
  
    $scope.voice = function() {
      var text = $scope.currentStep;
      var pace = $scope.rate;
      window.TTS.speak({
        text: text,
        locale: 'en-CA',
        rate: pace
      }, function() {
        $scope.recognition.start();
      }, function(reason) {
        alert(reason);
      });
    }
 
    $scope.handleVoiceInput = function(event) {
      if (event.results.length > 0) {
        var heardValue = event.results[0][0].transcript;
        if (heardValue == "next") {
          $scope.nextStep();
          $scope.$apply();
        } else if ((heardValue == "back") || (heardValue == "previous")) {
          $scope.prevStep();
          $scope.$apply();
        } else if ((heardValue == "read") || (heardValue == "what") || (
          heardValue == "repeat")) {
          // Call to text to speech plugin
          $scope.recognition.abort();
          $scope.voice();
        }
      }
    }

    $scope.$on("$ionicView.beforeEnter", function() {
      // popup alert
      $ionicPopup.alert({
        title: 'Voice Recognition Enabled',
        templateUrl: 'templates/popup.html',
        okText: 'OK',
        cssClass: 'myPopupClass'
      });
      $scope.recognition.onresult = $scope.handleVoiceInput;
      $scope.recognition.start();
      window.plugins.insomnia.keepAwake();
    });
  
    $scope.$on("$ionicView.beforeLeave", function() {
      $scope.recognition.abort();
      window.plugins.insomnia.allowSleepAgain();
    });
  })