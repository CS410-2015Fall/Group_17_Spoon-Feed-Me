describe('TestSearchController', function() {
	var scope, ionicLoadingMock;
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
		ionicLoadingMock = jasmine.createSpyObj('$ionicLoading',['show','hide']);
		$controller('SearchCtrl', {
			$scope: scope,
			$ionicLoading: ionicLoadingMock,
			RecipeService: recipeServiceMock
		});
	}));

	describe("after controller initialized", function() {
		it("content is empty", function() {
			expect(scope.content).toBe("");
		});
	});

	describe("test getRecipes()", function() {
		var deferredSearchResults; 

		beforeEach(inject(function(_$rootScope_, $q) {
			deferredSearchResults = $q.defer();
			recipeServiceMock.getFromSearch = jasmine.createSpy().and.returnValue(deferredSearchResults.promise);

			$rootScope = _$rootScope_;
			result = scope.getRecipes('dummySearchTerms');
		}));

		// Expect that $ionicLoading.show is called
		it("should call show an ionic loading animation", function() {
			expect(ionicLoadingMock.show).toHaveBeenCalled();
		});

		// If successful, $scope.content should be set to the 
		// resulting search results
		it("if successful, should set scope.content to be the search results", function() {
			deferredSearchResults.promise.then(function(results) {
				expect(scope.content).toBe(payload);

				// Expect that $ionicLoading.hide is called
				expect(ionicLoadingMock.hide).toHaveBeenCalled();
			});

			deferredSearchResults.resolve(payload);
			$rootScope.$digest();			
		});
	});

	describe("test saveRecipe()", function() {
		it("should call RecipeService.saveRecipe", function() {
			// spy on RecipeService.saveRecipe()
			recipeServiceMock.saveRecipe = jasmine.createSpy();

			// Set content
			scope.content = payload;

			// Call saveRecipe()
			scope.saveRecipe(payload[0]);

			// Expectations
			expect(recipeServiceMock.saveRecipe).toHaveBeenCalledWith(payload[0]);

		});
	});
});