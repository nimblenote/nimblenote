const React = require('react');
const {render} = require('react-dom');
const NotedApp = require('./containers/noted-app');
const globalStyles = require('./app.global.scss');

render((
	<div className={`platform-${process.platform}`}>
		<NotedApp style={globalStyles}/>
	</div>),
	document.querySelector('#app'));
