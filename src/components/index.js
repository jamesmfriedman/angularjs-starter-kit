angular.module('App.components', []);

function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('./', true, /\.js$/));