describe("RecipeDetailsCtrl test", function() {

	var scope,stateparams,
			deferredImageResults,recipeServiceMock;

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

	// Mock recipe payload
	var mockImages = {"First Ingredient": "url1",
										"Second Ingredient": "url2",
										"Third Ingredient": "url3"}

	beforeEach(module('SpoonFeedMe.controllers'));

	beforeEach(inject(function($rootScope,$controller,$q) {
		scope = $rootScope.$new();
		deferredImageResults = $q.defer();
		recipeServiceMock = {
			getImages: function() {
				deferredImageResults = $q.defer();
				return deferredImageResults.promise;
			}
		}
		stateparams = {recipeId : 0, fromSavedOrSearch : 'saved'};
		recipeServiceMock.getRecipes = jasmine.createSpy().and.returnValue(payload);
		spyOn(recipeServiceMock,'getImages').and.callThrough();

		$controller('RecipeDetailCtrl', {
			$scope: scope, 
			$stateParams: stateparams,
			RecipeService: recipeServiceMock
		});
	}));

	describe("after RecipeDetailsCtrl initializes", function() {
		it("initializes recipeId from stateParams", function() {
			expect(scope.recipeId).toBe(0);
		});
		
		it("initializes fromSavedOrSearch from stateParams", function() {
			expect(scope.fromSavedOrSearch).toBe('saved');
		});
		
		it("retrieves current recipe information from RecipeService", function() {
			expect(recipeServiceMock.getRecipes).toHaveBeenCalledWith(scope.fromSavedOrSearch);
			expect(scope.single).toBe(payload[0]);
		});

		// after the call to getImages is returned, scope.ingredients
		// has correct format
		it("makes call to RecipeService.getImages, and then scope.ingredients is key-value pair", function() {
				expect(recipeServiceMock.getImages).toHaveBeenCalledWith(payload[0].ingredients);
			  deferredImageResults.promise.then(function(results) {
					expect(scope.ingredients).toBe(mockImages);
				});
				deferredImageResults.resolve(mockImages);
				scope.$digest();
		});
	});
});