var app = angular.module('App', [
	'ngAnimate',
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

angular.element(document).ready(function() {
	angular.bootstrap(document, ['App']);
});