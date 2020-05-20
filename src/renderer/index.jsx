const React = require('react');
const {render} = require('react-dom');
const NimbleNoteApp = require('./containers/nimble-note-app');
const globalStyles = require('./app.global.scss');

render((
	<div className={`platform-${process.platform}`}>
		<NimbleNoteApp style={globalStyles}/>
	</div>),
document.querySelector('#app'));
