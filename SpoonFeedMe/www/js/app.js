// SpoonFeedMe App

// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('SpoonFeedMe', ['ionic', 'SpoonFeedMe.controllers', 'SpoonFeedMe.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.backButton.text('Go Back').icon('ion-android-arrow-back');
  $ionicConfigProvider.views.transition("android");
  $ionicConfigProvider.backButton.text("");
  $ionicConfigProvider.navBar.alignTitle("android");

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.search', {
    url: '/search',
    views: {
      'tab-search': {
        templateUrl: 'templates/tab-search.html',
        controller: 'SearchCtrl'
      }
    }
  })

  .state('tab.saved', {
      url: '/saved',
      views: {
        'tab-saved': {
          templateUrl: 'templates/tab-saved.html',
          controller: 'SavedCtrl'
        }
      }
  })

  .state('tab.saved-detail', {
      url: '/saved/:recipeId/:fromSavedOrSearch',
      views: {
        'tab-saved': {
          templateUrl: 'templates/recipe-detail.html',
          controller: 'RecipeDetailCtrl'
        }
      }
  })

  .state('tab.search-detail', {
      url: '/search/:recipeId/:fromSavedOrSearch',
      views: {
        'tab-search': {
          templateUrl: 'templates/recipe-detail.html',
          controller: 'RecipeDetailCtrl'
        }
      }
  })

  .state('walkthrough', {
    url: '/walkthrough/:recipeId/:fromSavedOrSearch',
    templateUrl: 'templates/walkthrough.html',
    controller: 'WalkthroughCtrl'
  })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/search');

});