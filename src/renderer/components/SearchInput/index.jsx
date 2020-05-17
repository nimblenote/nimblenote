const React = require('react');
const PropTypes = require('prop-types');
const styles = require('./styles.scss');

const SearchInput = ({
	query = '',
	inputref = {},
	changeEvent = () => {}
}) => {
	return (
		<div className={styles.searchinput}>
			<input
				ref={inputref}
				type="search"
				placeholder="Search or create&hellip;"
				value={query}
				onChange={changeEvent}
			/>
		</div>
	);
};

SearchInput.propTypes = {
	query: PropTypes.string,
	inputref: PropTypes.object,
	changeEvent: PropTypes.func
};

module.exports = SearchInput;
