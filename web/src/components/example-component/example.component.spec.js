describe('example-component', function() {
	var ExampleService;

	// Before each test load our api.users module
	beforeEach(angular.mock.module('App.common'));

	// Before each test set our injected Users factory (_Users_) to our local Users variable
	beforeEach(inject(function(_ExampleService_) {
		ExampleService = _ExampleService_;
	}));

	// A simple test to verify the Users factory exists
	it('should exist', function() {
		expect(ExampleService.test('hello')).toBe('hello');
	});
});