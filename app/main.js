'use strict';

let Store = require('./stores/Store');
let React = require('react');

window.$ = require('jquery');

let AppBase = require('./views/AppBase.jsx');

// Render AppBase component
React.render(React.createElement(AppBase, {}), document.getElementById('app'));
