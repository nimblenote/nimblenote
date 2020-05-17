const React = require('react');
const {render} = require('react-dom');
const styles = require('./styles.scss');

module.exports = function TitleBar() {
	return (
		<div className={styles.titlebar}>
			<span>Noted</span>
		</div>
	)
}
