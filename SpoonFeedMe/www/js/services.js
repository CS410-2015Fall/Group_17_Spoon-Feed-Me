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
    }
  };
})

.factory('StorageService', function($http) {
  // Fake Local Storage JSON Array
  var savedRecipes = [{
    name: 'Chocolate-Covered OREO Cookie Cake',
    summary: 'Best Ice Cream Sandwich Recipe',
    imgUrl: 'http://images.sweetauthoring.com/recipe/133036_977.jpg',
    ingredients: [
        "1 (18.25 ounce) package devil's food chocolate cake mix",
        "4 (1 ounce) squares BAKER'S Semi-Sweet Chocolate",
        "1/4 cup butter",
        "1 (8 ounce) package PHILADELPHIA Cream Cheese, softened",
        "1/2 cup sugar",
        "2 cups thawed COOL WHIP Whipped Topping",
        "12 OREO Cookies, coarsely crushed"
      ],
    instructions: [
        "Heat oven to 350 degrees F.",
        "Prepare cake batter and bake in 2 (9-inch) round pans as directed on package. Cool cakes in pans 10 min. Invert onto wire racks; gently remove pans. Cool cakes completely.",
        "Microwave chocolate and butter in small microwaveable bowl on HIGH 2 min. or until butter is melted. Stir until chocolate is completely melted. Cool 5 min. Meanwhile, beat cream cheese and sugar in large bowl with mixer until blended. Gently stir in COOL WHIP and crushed cookies.",
        "Place 1 cake layer on plate, spread with cream cheese mixture. Top with remaining cake layer. Spread top with chocolate glaze; let stand 10 min. or until firm. Keep refrigerated."
    ]
  }, {
    name: 'Coconut Poke Cake',
    summary: 'Best Coconut Poke Cake Recipe',
    imgUrl: 'http://images.media-allrecipes.com/userphotos/250x250/334118.jpg',
    ingredients: [
        "1 (18.25 ounce) package white cake mix",
        "1 (14 ounce) can cream of coconut",
        "1 (14 ounce) can sweetened condensed milk",
        "1 (16 ounce) package frozen whipped topping, thawed",
        "1 (8 ounce) package flaked coconut"
      ],
    instructions: [
        "Prepare and bake white cake mix according to package directions. Remove cake from oven. While still hot, using a utility fork, poke holes all over the top of the cake.",
        "Mix cream of coconut and sweetened condensed milk together. Pour over the top of the still hot cake. Let cake cool completely then frost with the whipped topping and top with the flaked coconut. Keep cake refrigerated."
    ]
  }];

  return {
    allSavedRecipes: function() {
      return savedRecipes;
    },
    removeSavedRecipe: function(recipe) {
      savedRecipes.splice(savedRecipes.indexOf(recipe), 1);
    },
    getSingleRecipe: function(recipeId) {
      return savedRecipes[parseInt(recipeId)];
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
    }
  };
});
