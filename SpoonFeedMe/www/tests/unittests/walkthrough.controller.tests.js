describe('TestWalkthroughController', function() {
    var scope,stateparams;
    var recipeServiceMock = {};

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

    // load controller's module
    beforeEach(module('SpoonFeedMe.controllers'));

    beforeEach(module(function($provide) {
        $provide.value('RecipeService', recipeServiceMock);
    }));

    beforeEach(inject(function($rootScope,$controller) {
        scope = $rootScope.$new();
        stateparams = {recipeId : 0};
        recipeServiceMock.getRecipes = jasmine.createSpy().and.returnValue(payload);
        $controller('WalkthroughCtrl', {
            $scope: scope, 
            $stateParams: stateparams,
            RecipeService: recipeServiceMock});
    }));

    describe("after initializaiton", function() {
        it("scope values should be initialized", function() {
            expect(scope.recipeId).toEqual(0);
            expect(scope.recipe).toBe(payload[0]);
            expect(scope.currentStepNum).toEqual(1);
            expect(scope.maxStepNum).toEqual(payload[0].instructions.length);
        });
    });

    describe("when I call next/prev step", function() {
        it("should increment the current step (as long as subsequent step is in bounds", function() {
            expect(scope.currentStepNum).toEqual(1);
            
            // expect that it won't decrement, since it is at step 1
            scope.prevStep();
            expect(scope.currentStepNum).toEqual(1);
            
            // expect that it will increment
            scope.nextStep();
            expect(scope.currentStepNum).toEqual(2);

            // expect that it won't increment, since it is at maxStepNum
            scope.nextStep();
            expect(scope.currentStepNum).toEqual(2);

            // expect that it will decrement
            scope.prevStep();
            expect(scope.currentStepNum).toEqual(1);
        });
    });
});