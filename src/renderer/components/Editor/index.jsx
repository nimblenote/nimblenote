const React = require('react');
const {render} = require('react-dom');
const styles = require('./styles.scss');

module.exports =  function Editor({
	content = '',
	inputref = {},
	changeEvent = () => {},
	disabled = true
}) {
	return (
		<div className={styles.editor}>
			<textarea
				ref={inputref}
				onChange={changeEvent}
				value={content}
				disabled={disabled ? 'disabled' : null}
				placeholder={
					disabled ? 'No note selected' : 'Enter note contents...'
				}
			/>
		</div>
		);
}
