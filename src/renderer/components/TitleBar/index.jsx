const React = require('react');
const styles = require('./styles.scss');

const TitleBar = () => {
	return (
		<div className={styles.titlebar}>
			<span>nimblenote</span>
		</div>
	);
};

module.exports = TitleBar;
