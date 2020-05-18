const React = require('react');
const PropTypes = require('prop-types');
const styles = require('./styles.scss');

const Editor = ({
	content = '',
	inputref = {},
	changeEvent = () => {},
	disabled = true
}) => {
	return (
		<div className={styles.editor}>
			<textarea
				ref={inputref}
				value={content}
				disabled={disabled ? 'disabled' : null}
				placeholder={disabled ? 'No note selected' : 'Enter note contents...'}
				onChange={changeEvent}
			/>
		</div>
	);
};

Editor.propTypes = {
	content: PropTypes.string,
	inputref: PropTypes.object,
	changeEvent: PropTypes.func,
	disabled: PropTypes.bool
};

module.exports = Editor;
