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

    var TTSMock = {
        speak: function() {}
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


    beforeEach(module('SpoonFeedMe.controllers', function($provide) {
        $provide.value('RecipeService', recipeServiceMock);
    }));

    beforeEach(inject(function($rootScope,$controller) {
        $rootScope.recognition = recognitionMock;
        scope = $rootScope.$new();
        stateparams = {recipeId : 0};
        recipeServiceMock.getRecipes = jasmine.createSpy().and.returnValue(payload);
        window.TTS = TTSMock;
        $controller('WalkthroughCtrl', {
            $scope: scope, 
            $stateParams: stateparams,
            RecipeService: recipeServiceMock
        });
    }));

    describe("test after initilization", function() {
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
            expect(scope.recognition.onresult).toBeUndefined();
        });

        it("after entering view, voice recognition is running", function() {
            // Trigger $ionicView.beforeEnter 
            scope.$emit('$ionicView.beforeEnter');
            // We expect that the voice recognition will have
            // started after entering the view
            expect(scope.recognition.running).toBe(true);
        });

        it("after entering view, onresult is not undefined", function() {
            expect(scope.recognition.onresult).not.toBeUndefined;
        });

        describe("test voice inputs", function() {

            // Before each voice input test, replace 
            // the recognition callback with function in
            // the testing scope (no dollar sign)
            //
            // The reason for this is that it results in errors
            // to leave it as $scope.handleVoiceInput (with $). I suspect
            // this is because we assign references to $scope to our
            // mock recognition object defined above.

            beforeEach(function() {
                scope.recognition.onresult = scope.handleVoiceInput;
            });

            it("calls nextStep() when user says 'next'", function() {

                spyOn(scope,'nextStep');
                var mockEvent = new MockEvent('next');
                scope.recognition.onresult(mockEvent);

                expect(scope.nextStep).toHaveBeenCalled();
            });

            it("calls prevStep() upon certain commands", function() {

                spyOn(scope,'prevStep');

                // all commands which will return to previous step
                var variants = ['back','previous'];

                variants.forEach(function (variant) {
                    var mockEvent = new MockEvent(variant);
                    scope.recognition.onresult(mockEvent);
                    expect(scope.prevStep).toHaveBeenCalled();
                });
            });

            it("calls voice() upon certain commands", function() {

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

        describe("when I call voice function", function() {

            beforeEach(function() {
                spyOn(window.TTS,'speak');
                scope.voice();
            });

            it("it reads out the current step", function() {
                expect(window.TTS.speak).toHaveBeenCalled();
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