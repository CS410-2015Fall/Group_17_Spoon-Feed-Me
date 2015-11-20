describe('RecipeService', function() {

	// Values used for testing
	var recipeService;
	var searchServiceMock = {};
	var searchTerms = 'SearchTerm';
	var searchPayload = [{
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

	//Load the app module
	beforeEach(module('SpoonFeedMe'));

	// disable template caching, mock services
	beforeEach(module(function($provide, $urlRouterProvider) {  
	    $provide.value('$ionicTemplateCache', function(){} );
	    $provide.value('SearchService', searchServiceMock)
	    $urlRouterProvider.deferIntercept();
	}));

	// Inject RecipeService
	beforeEach(inject(function(_RecipeService_) {  
		recipeService = _RecipeService_;	
	}));

	describe('#getRecipesFromSearch', function() {

		var deferredSearchResults;

		beforeEach(inject(function(_$rootScope_, $q) {
			deferredSearchResults = $q.defer();
			searchServiceMock.search = jasmine.createSpy().and.returnValue(deferredSearchResults.promise);

			$rootScope = _$rootScope_;
			result = recipeService.getFromSearch(searchTerms);
		}));

		it("should call search on searchService", function() {
			expect(searchServiceMock.search).toHaveBeenCalledWith(searchTerms);
		});

		describe('when the search is executed', function() {
			it('if successful, should return search payload', function() {
				deferredSearchResults.promise.then(function(results) {
					expect(results).toBe(searchPayload);
				});
				deferredSearchResults.resolve(searchPayload);
				$rootScope.$digest();
			});
		});
	});
});