'use strict';

let React = require('react');
let TicTacToe = require('./views/TicTacToe.jsx');

// Render TicTacToe component
React.render(React.createElement(TicTacToe, {}), document.getElementById('app'));
