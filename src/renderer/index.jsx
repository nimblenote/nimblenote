const React = require('react');
const {render} = require('react-dom');
const NotedApp = require('./containers/noted-app');
const globalStyles = require('./app.global.scss');

render(<NotedApp style={globalStyles}/>, document.querySelector('#app'));
