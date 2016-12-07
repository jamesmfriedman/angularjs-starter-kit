angular.module('App.common').service('ExampleService', function(){
	return {
		0: 'hello world',
		test: function(val) {
			return val;
		}
	};
});