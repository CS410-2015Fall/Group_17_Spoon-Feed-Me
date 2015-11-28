describe('TestStorageService', function() {

    var storageService;
    var mockLocalStorage = {};

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

    var mockRecipe = {"name": "Mock Recipe 2", 
        "ingredients": ["First Ingredient", 
                        "Second Ingredient", 
                        "Third Ingredient"], 
        "url": "http://mockurl.com", 
        "servings": "6 servings", 
        "time": "30 Min", 
        "imgUrl": "http://mockimgurl.com", 
        "instructions": ["Step One", 
                        "Step Two"]}

    // Load the app module, disable template caching
    beforeEach(
        module('SpoonFeedMe',function($provide, $urlRouterProvider) {  
            $provide.value('$ionicTemplateCache', function(){} );
            $provide.value('$localstorage', mockLocalStorage);
            $urlRouterProvider.deferIntercept();
        }));

    // Inject Storage Service
    beforeEach(inject(function(_StorageService_) {  
        storageService = _StorageService_;
    }));

    describe("when I call StorageService.allSavedRecipes", function() {
        beforeEach(function() {
            mockLocalStorage.getObject = jasmine.createSpy().and.returnValue(payload);            
            storageService.allSavedRecipes();
        });
        
        it("it returns savedResults", function() {
            expect(mockLocalStorage.getObject).toHaveBeenCalledWith('savedRecipes');
        });

        it("it sets savedRecipes to savedResults", function() {
            expect(storageService.getSavedRecipes()).toBe(payload);
        });
    });

    describe("when I call StorageService.removeSavedRecipes", function() {
        beforeEach(function() {
            mockLocalStorage.setObject = jasmine.createSpy();            
            storageService.removeSavedRecipe(payload[0]);
        });

        it("removes given recipe from savedRecipes", function() {
            expect(storageService.getSavedRecipes()).toEqual([]);
        });

        it("calls localstorage.setObject", function() {
            expect(mockLocalStorage.setObject).toHaveBeenCalledWith('savedRecipes',
            storageService.getSavedRecipes());
        });
    });

    describe("when I call getSingleRecipe", function() {
        it("returns that recipe", function() {
            storageService.setSavedRecipes(payload);
            expect(storageService.getSingleRecipe(0)).toBe(payload[0]);
        });
    });

    describe("when I call saveSingleRecipe", function() {

        beforeEach(function() {
            mockLocalStorage.setObject = jasmine.createSpy(); 
            storageService.setSavedRecipes(payload);
        });

        it("if recipe not already in saved, saves it", function() {
            expect(storageService.getSavedRecipes().length).toEqual(1);
            storageService.saveSingleRecipe(mockRecipe);
            expect(storageService.getSavedRecipes().length).toEqual(2);
            expect(mockLocalStorage.setObject).toHaveBeenCalled();
        });

        it("if recipe is already in saved, don't save it", function() {
            expect(storageService.getSavedRecipes().length).toEqual(2);
            storageService.saveSingleRecipe(mockRecipe);
            expect(storageService.getSavedRecipes().length).toEqual(2);
            expect(mockLocalStorage.setObject).not.toHaveBeenCalled();
        });
    });

});