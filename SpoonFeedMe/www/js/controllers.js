angular.module('starter.controllers', [])

.controller('SearchCtrl', function($scope, Saved) {})

.controller('SavedCtrl', function($scope, Saved) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.saved = Saved.all();
  $scope.remove = function(recipe) {
    Saved.remove(recipe);
  };
})

.controller('SavedDetailCtrl', function($scope, $stateParams, Saved) {
  $scope.single = Saved.get($stateParams.recipeId);
})
