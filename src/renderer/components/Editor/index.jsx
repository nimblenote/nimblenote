const React = require('react');
const PropTypes = require('prop-types');
const styles = require('./styles.scss');

const Editor = ({
	content = '',
	inputref = {},
	changeEvent = () => {},
	isDisabled = true
}) => {
	return (
		<div className={styles.editor}>
			<textarea
				ref={inputref}
				value={content}
				disabled={isDisabled ? 'disabled' : null}
				placeholder={isDisabled ? 'No note selected' : 'Enter note contents...'}
				onChange={changeEvent}
			/>
		</div>
	);
};

Editor.propTypes = {
	content: PropTypes.string,
	inputref: PropTypes.object,
	changeEvent: PropTypes.func,
	isDisabled: PropTypes.bool
};

module.exports = Editor;
