const React = require('react');
const styles = require('./styles.scss');

const NoNotes = () => {
	return (
		<div className={styles.noNotes}>
			<h3>Welcome to nimblenote! 👋</h3>
			<p>Start by typing the name of a new note in the search box and pressing <kbd>Enter ⏎</kbd>. Your note will then appear and you can start writing!</p>
			<p>nimblenote automatically saves your note as you type.</p>
			<p>If you get stuck, you can display help by typing in <kbd>?</kbd> in the search input above.</p>
		</div>
	);
};

module.exports = NoNotes;
