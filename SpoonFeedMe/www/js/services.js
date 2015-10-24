angular.module('SpoonFeedMe.services', [])

.factory('RecipeService', function($http) {
  // Might use a resource here that returns a JSON array

  // Calling saved data from phone? Or calling server to get reipes
  // Some fake testing data
  var savedRecipes = [{
    id: 0,
    title: 'Chocolate-Covered OREO Cookie Cake',
    summary: 'Best Ice Cream Sandwich Recipe',
    image: 'http://images.sweetauthoring.com/recipe/133036_977.jpg',
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
    id: 1,
    title: 'Coconut Poke Cake',
    summary: 'Best Coconut Poke Cake Recipe',
    image: 'http://images.media-allrecipes.com/userphotos/250x250/334118.jpg',
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
    getFromSearch: function(searchQuery) {

      var retVal = "something";

      return $http.get("http://45.55.223.121/"+searchQuery).then (
        function(payload) {
          return payload.data;
        },
        function(error) {
          console.log("Error",error.status);
        });
    },
    all: function() {
      return savedRecipes;
    },
    remove: function(recipe) {
      savedRecipes.splice(savedRecipes.indexOf(recipe), 1);
    },
    get: function(recipeId) {
      for (var i = 0; i < savedRecipes.length; i++) {
        if (savedRecipes[i].id === parseInt(recipeId)) {
          return savedRecipes[i];
        }
      }
      return null;
    }
  };
});
