describe('RecipeService', function() {

	// Constants
	var searchResults = [{
		name: 'Chocolate-Covered OREO Cookie Cake',
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
	]}];

	var searchTerms = 'SearchTerm';

	var recipeService,deferredSearchResults;
	var searchServiceMock = {};

	//Load the app module
	beforeEach(module('SpoonFeedMe'));

	// disable template caching
	beforeEach(module(function($provide, $urlRouterProvider) {  
	    $provide.value('$ionicTemplateCache', function(){} );
	    $urlRouterProvider.deferIntercept();
	}));

	// Mock the SearchService
	beforeEach(module(function($provide) {
		$provide.value('SearchService', searchServiceMock);
	}));

	beforeEach(inject(function(_RecipeService_, $q) {  

		recipeService = _RecipeService_;
		deferredSearchResults = $q.defer();

		// Initialize search spy
		searchServiceMock.search = jasmine.createSpy().and.returnValue(deferredSearchResults.promise);
	
	}));

	describe('#getRecipesFromSearch', function() {

		// Todo: Call getAll from the service
		beforeEach(inject(function(_$rootScope_) {
			$rootScope = _$rootScope_;
			result = recipeService.getFromSearch(searchTerms);
		}));

		it("should call search on searchService", function() {
			expect(searchServiceMock.search).toHaveBeenCalledWith(searchTerms);
		});

		describe('when the search is executed', function() {
			it('if successful, should return search payload', function() {
				deferredSearchResults.promise.then(function(results) {
					expect(results).toBe(searchResults);
				});
				deferredSearchResults.resolve(searchResults);
				$rootScope.$digest();
			});
		});
	});
});