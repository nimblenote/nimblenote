const React = require('react');
const {render} = require('react-dom');
const styles = require('./styles.scss');

module.exports = function SearchInput({
	query = '',
	inputref = {},
	changeEvent = () => {}
}) {
	return (
		<div className={styles.searchinput}>
			<input
				type="search"
				placeholder="Search or create&hellip;"
				value={query}
				ref={inputref}
				onChange={changeEvent}
			/>
		</div>
	);
}
