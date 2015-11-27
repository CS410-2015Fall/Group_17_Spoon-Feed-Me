angular.module('SpoonFeedMe.controllers', ['ionic.utils'])


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
  var payload = RecipeService.getRecipes($scope.fromSavedOrSearch)[$scope.recipeId];
  $scope.single = payload;
  $scope.instructions = payload.instructions;
  $scope.ingredients = payload.ingredients; 

})


// Controller for recipe instruction walkthrough
.controller('WalkthroughCtrl', function($scope, $stateParams, $ionicHistory, RecipeService) {



  $scope.recipeId = $stateParams.recipeId;
  var payload = RecipeService.getRecipes($stateParams.fromSavedOrSearch)[$scope.recipeId];
  $scope.recipe = payload;

  $scope.currentStepNum = 1;
  $scope.currentStep = $scope.recipe.instructions[$scope.currentStepNum-1];
  $scope.maxStepNum = $scope.recipe.instructions.length;
  $scope.percentageThrough = ($scope.currentStepNum/$scope.maxStepNum)*100;
  $scope.max = ($scope.maxStepNum/$scope.maxStepNum)*100;

  $scope.nextStep = function() {

    $scope.currentStepNum+=1;
    $scope.currentStep = $scope.recipe.instructions[$scope.currentStepNum-1];
    $scope.percentageThrough = ($scope.currentStepNum/$scope.maxStepNum)*100;
    $scope.max = ($scope.maxStepNum/$scope.maxStepNum)*100;
  }

  $scope.prevStep = function() {

    $scope.currentStepNum-=1;
    $scope.currentStep = $scope.recipe.instructions[$scope.currentStepNum-1];
    $scope.percentageThrough = $scope.currentStepNum/$scope.maxStepNum;
    $scope.max = $scope.maxStepNum;

  }

$scope.rate = 0.8;
var payload = RecipeService.getRecipes($scope.fromSavedOrSearch)[$scope.recipeId];
$scope.single = payload;



    $scope.changeLow = function(){
      // alert('ouch');
      $scope.rate = 0.5;
    }

    $scope.changeHigh = function(){
      $scope.rate = 1.2;
    }


    $scope.help = function(){
      alert("Welcome to Help\nHere are some guidlines");
      alert("To read the step = Say 'Read'");
      alert("To go to the next step = Say 'Next'");
      alert("To go to the previous step = Say 'Back' or 'Previous'");
      alert("To slow down the pace of the instruction = Say 'Slower'");
      alert("To speed up the pace of the instruction = Say 'Faster'"); 
    }

    $scope.voice = function(){
      $scope.recognition.abort();
     var text = $scope.currentStep;
     var pace = $scope.rate;

window.TTS.speak({
        text: text,
        locale: 'en-CA',
        rate: pace
    }, function () {
        //alert('success');
        //alert("Starting voice recognition...");
        $scope.recognition.start();
    }, function (reason) {
        alert(reason);
    });

    
  }

  $scope.$on("$ionicView.beforeEnter", function() {

    $scope.recognition.onresult = function(event) {
      if (event.results.length > 0) {
        var heardValue = event.results[0][0].transcript;
        if(heardValue == "next") {
          // alert("I heard next...");
          $scope.nextStep();
          $scope.$apply();
        } else if((heardValue == "back") || (heardValue == "previous")) {
          // alert("I heard back...");
          $scope.prevStep();
          $scope.$apply();
        }else if(heardValue == "slower"){
          $scope.changeLow();
        } else if (heardValue == "faster"){
          $scope.changeHigh();
        }

        else if((heardValue == "read") || (heardValue == "what") || (heardValue == "repeat")){
          // Call to text to speech plugin
          
          //alert("Stopping voice recognition...");
          $scope.recognition.stop();

          $scope.voice();

        }
      }
    }

    
    alert("Voice Recognition Activated\nWelcome to WalkThrough");    

    $scope.recognition.start();

  });

  $scope.$on("$ionicView.beforeLeave", function() {

    alert("Stopping voice recognition...");
    $scope.recognition.abort();

  });

})
