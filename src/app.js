var app = angular.module('App', [
	'ngAnimate',
	'ngTouch',
	'ngSanitize',

	'App.common',
	'App.directives',
	'App.components'
]);

app.config(function($locationProvider){
	$locationProvider.html5Mode(true);	
});

app.run(function($rootScope){
	$rootScope.hello = 'Hello World!';
});