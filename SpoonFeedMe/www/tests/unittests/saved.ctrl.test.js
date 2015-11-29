describe('TestSavedController', function() {
	var scope;
	var recipeServiceMock = {};

    // Mock recipe payload
    var payload = [{"name": "Mock Recipe", 
        "ingredients": ["First Ingredient", 
                        "Second Ingredient", 
                        "Third Ingredient"], 
        "url": "http://mockurl.com", 
        "servings": "6 servings", 
        "time": "30 Min", 
        "imgUrl": "http://mockimgurl.com", 
        "instructions": ["Step One", 
                        "Step Two"]}]
 
	beforeEach(module('SpoonFeedMe.controllers', function($provide) {
		$provide.value('RecipeService', recipeServiceMock);
	}));

	beforeEach(inject(function($rootScope,$controller) {
		scope = $rootScope.$new();
		$controller('SavedCtrl', {
			$scope: scope,
			RecipeService: recipeServiceMock
		});
	}));

	describe("test controller initialization", function() {

		// Expect that $ionicLoading.show is called
		it("before entering view, $scope.saved is undefined", function() {
			expect(scope.saved).toBeUndefined();
		});

		it("after entering view, saved consists of all saved recipes", function(){
			recipeServiceMock.allRecipesFromSaved = jasmine.createSpy().and.returnValue(payload);
			scope.$emit('$ionicView.beforeEnter');

			// Expect that all saved recipes were retrieved from
			// RecipeService
			expect(recipeServiceMock.allRecipesFromSaved).toHaveBeenCalled();
			
			// Expect that $scope.saved is now the payload of saved
			// recipes returned by RecipeService
			expect(scope.saved).toBe(payload);
		});

	});

	describe("test remove()", function() {
		it("should call RecipeService.saveRecipe", function() {
			// spy on RecipeService.saveRecipe()
			recipeServiceMock.removeRecipeFromSaved = jasmine.createSpy();

			// Set content
			scope.saved = payload;

			// Call saveRecipe()
			scope.remove(payload[0]);

			// Expect recipe to be removed from saved recipes
			expect(recipeServiceMock.removeRecipeFromSaved).toHaveBeenCalledWith(payload[0]);
		});
	});
});