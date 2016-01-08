var app = angular.module('App', [
	'ngAnimate',
	'ngTouch',
	'ngSanitize',

	'App.common',
	'App.directives',
	'App.components'
]);

app.run(function($rootScope){
	$rootScope.hello = 'Hello World!';
});