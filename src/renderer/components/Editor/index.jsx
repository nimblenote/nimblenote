const React = require('react');
const PropTypes = require('prop-types');
const styles = require('./styles.scss');

const CodeMirror = require('react-codemirror2').Controlled;
require('codemirror/mode/gfm/gfm'); // eslint-disable-line import/no-unassigned-import

const Editor = ({
	content = '',
	inputref = {},
	changeEvent = () => {},
	isDisabled = true
}) => {
	const handleChange = (editor, data, value) => {
		const event = {
			target: {
				value
			}
		};

		return changeEvent(event);
	};

	const options = {
		readOnly: isDisabled ? 'nocursor' : false,
		lineWrapping: true,
		viewportMargin: Infinity,
		theme: 'solarized dark',
		dragDrop: false,
		mode: 'gfm'
	};

	return (
		<div className={styles.editor}>
			<CodeMirror ref={inputref} options={options} value={content} onBeforeChange={handleChange}/>
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
