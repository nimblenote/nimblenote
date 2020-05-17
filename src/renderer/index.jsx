const React = require('react');
const {render} = require('react-dom');
const NotedApp = require('./containers/noted-app');
require('./app.global.scss');

render(<NotedApp />, document.getElementById('app'));
