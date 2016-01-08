// For webpack, filter out .test files
function requireAll(r) { 
	r.keys().forEach(function(key){
		key.search('.test') === -1 && r(key)
	});
}; 

// dependencies
require('angular/angular');
require('angular-animate/angular-animate');
require('angular-sanitize/angular-sanitize');
require('angular-touch/angular-touch');

// app
require('app');
require('./directives');
require('./components');
require('./common');

requireAll(require.context('./directives', true, /\.js$/));
requireAll(require.context('./components', true, /\.js$/));
requireAll(require.context('./common', true, /\.js$/));