describe('TestWalkthroughController', function() {
    var scope,stateparams;
    var recipeServiceMock = {};

    // Mock event objects
    function MockEvent(heardValue){
        this.heardValue = heardValue;
        return {
            results: [[{
                transcript: this.heardValue
            }]]
        }
    }

    // Mock voice recognition object
    var recognitionMock = {
        running: false,
        start: function() { this.running=true },
        stop: function() { this.running=false },
        abort: function() { this.running=false },
    };

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


    // load controller's module
    beforeEach(module('SpoonFeedMe.controllers'));

    beforeEach(module(function($provide) {
        $provide.value('RecipeService', recipeServiceMock);
    }));

    beforeEach(inject(function($rootScope,$controller) {
        $rootScope.recognition = recognitionMock;
        scope = $rootScope.$new();
        stateparams = {recipeId : 0};
        recipeServiceMock.getRecipes = jasmine.createSpy().and.returnValue(payload);
        $controller('WalkthroughCtrl', {
            $scope: scope, 
            $stateParams: stateparams,
            RecipeService: recipeServiceMock
        });
    }));

    describe("after initializaiton", function() {
        it("scope values should be initialized", function() {
            expect(scope.recipeId).toEqual(0);
            expect(scope.recipe).toBe(payload[0]);
            expect(scope.currentStepNum).toEqual(1);
            expect(scope.maxStepNum).toEqual(payload[0].instructions.length);
        });
    });

    describe("test ionicView events", function() {
        
        it("before entering view, voice recognition is not running", function() {
            // before entering the view, voice recognition is off
            expect(scope.recognition.running).toBe(false);
        });

        it("before entering view, onresult is not defined", function() {
            expect(scope.recognition.onresult).toBe(undefined);
        });

        it("after entering view, voice recognition should be running", function() {
            //scope.nextStep=jasmine.createSpy();

            scope.$emit('$ionicView.beforeEnter');
            // We expect that the voice recognition will have
            // started after entering the view
            expect(scope.recognition.running).toBe(true);
        });

        it("after entering view, onresult is not undefined", function() {
            expect(scope.recognition.onresult).not.toBe(undefined);
        });

        describe("test voice inputs", function() {

            // Before each voice input test, replace 
            // the recognition callback with function in
            // the testing scope (no dollar sign)
            //
            // The reason for this is that it results in errors
            // to leave it as $scope.handleVoiceInput, like it is
            // set when $ionicView.beforeEnter event occurs. I suspect
            // this is because $scope and scope are slightly different

            beforeEach(function() {
                scope.recognition.onresult = scope.handleVoiceInput;
            });

            it("calls nextStep when user says 'next'", function() {

                spyOn(scope,'nextStep');
                var mockEvent = new MockEvent('next');
                scope.recognition.onresult(mockEvent);

                // When recognition 'hears' next, call nextStep()
                expect(scope.nextStep).toHaveBeenCalled();
            });

            it("calls prevStep when user says 'back' or 'previous", function() {

                spyOn(scope,'prevStep');

                // all commands which will return to previous step
                var variants = ['back','previous'];

                variants.forEach(function (variant) {
                    var mockEvent = new MockEvent(variant);
                    scope.recognition.onresult(mockEvent);
                    expect(scope.prevStep).toHaveBeenCalled();
                });
            });

            // TODO: Slower/faster
            // maybe after adjusting the slower/faster to be
            // a gradiant (e.g. so you can return to normal speed)

            // TODO: stopping voice recognition?
            it("calls voice upon certain commands", function() {

                spyOn(scope,'voice');

                // all commands which will cause the app to
                // read out the current instruction using TTC
                var variants = ['read','what','repeat'];

                variants.forEach(function (variant) {
                    var mockEvent = new MockEvent(variant);
                    scope.recognition.onresult(mockEvent);
                    expect(scope.voice).toHaveBeenCalled();

                    // simulate the fact that the voice recognition
                    // will restart after the voice function runs

                    // TODO: restart voice at this point? 
                    scope.recognition.start();
                });
            });

        });

        it("before leaving view, abort voice recognition", function() {
            expect(scope.recognition.running).toBe(true);
            scope.$emit('$ionicView.beforeLeave');
            expect(scope.recognition.running).toBe(false);
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