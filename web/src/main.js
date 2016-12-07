// For webpack, filter out .test files
function requireAll(r) { 
	r.keys().forEach(function(key){
		key.search('.spec') === -1 && r(key);
	});
} 


// app
require('app');
require('./directives');
require('./components');
require('./common');

requireAll(require.context('./directives', true, /\.js$/));
requireAll(require.context('./components', true, /\.js$/));
requireAll(require.context('./common', true, /\.js$/));