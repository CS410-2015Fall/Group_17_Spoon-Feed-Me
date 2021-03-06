angular.module('SpoonFeedMe.services', [])

.factory('SearchService', function($http) {
  return {
    search: function(query){
      return $http.get("http://45.55.223.121/" + query).then (
        function(payload) {
          return payload.data;
        },
        function(error) {
          console.log("Error", error.status);
        });
    },

    getImages: function(ingredients) {
      for (i=0; i<ingredients.length; i++) {
        var ingr = ingredients[i];
        ingredients[i] = ingr.replace(/,/g, '');
      }
      var strIngredients = ingredients.toString();
      return $http.get("http://45.55.223.121/images", {params: {'ingredients': strIngredients}}).then (
        function(payload) {
          return payload.data;
        },
        function(error) {
          console.log("Error", error.status);
        });
    }
  };
})

.factory('StorageService', function($http, $localstorage) {
  var savedRecipes = [];
  return {
    allSavedRecipes: function() {
      savedRecipes = $localstorage.getObject('savedRecipes');
      return savedRecipes;
    },

    removeSavedRecipe: function(recipe) {
      savedRecipes.splice(savedRecipes.indexOf(recipe), 1);
      $localstorage.setObject('savedRecipes', savedRecipes);
    },

    getSingleRecipe: function(recipeId) {
      return savedRecipes[parseInt(recipeId)];
    },

    saveSingleRecipe: function(recipe) {
      for(var i = 0; i < savedRecipes.length; i++){
        if(savedRecipes[i].name === recipe.name) {
          alert("Recipe already saved!");
          return;
        }
      }
      savedRecipes.push(recipe);
      $localstorage.setObject('savedRecipes', savedRecipes);
    },

    // For testing purposes
    getSavedRecipes: function() {
      return savedRecipes;
    },

    setSavedRecipes: function(recipe) {
      savedRecipes = recipe;
    }
  }
})

.factory('RecipeService', function(SearchService, StorageService, $http) {

  var searchPayload;

  return {
    getFromSearch: function(searchQuery) {
      return SearchService.search(searchQuery).then(function (recipeData) {
        searchPayload = recipeData;
        return searchPayload;
      });
    },
    getRecipes: function(savedOrSearch) {
      if(savedOrSearch=='search') {
        return searchPayload;
      }
      else return StorageService.allSavedRecipes();
    },

    allRecipesFromSaved: function() {
      return StorageService.allSavedRecipes();
    },

    removeRecipeFromSaved: function(recipe) {
      StorageService.removeSavedRecipe(recipe);
    },

    getRecipeFromSaved: function(recipeId) {
      return StorageService.getSingleRecipe(recipeId);
    },

    saveRecipe: function(recipe) {
      StorageService.saveSingleRecipe(recipe);
    },

    getImages: function(ingredients) {
      return SearchService.getImages(ingredients).then(function (data) {
        return data;
      });
    },

    // Used for testing
    setSearchPayload: function(payload) {
      searchPayload = payload;
    },

    getSearchPayload: function() {
      return searchPayload;
    }
  };
})


angular.module('ionic.utils', [])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },

    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },

    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },

    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '[]');
    },

    removeItem: function(key){
      $window.localStorage.removeItem(key);
    }
  }
}]);
