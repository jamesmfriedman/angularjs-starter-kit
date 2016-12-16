// this file is only included in development to trigger reloads when templates change.
function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('../public/', true, /\.html$/));
require('!raw!./index.html');