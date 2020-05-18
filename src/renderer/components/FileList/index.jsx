const React = require('react');
const PropTypes = require('prop-types');
const styles = require('./styles.scss');

const FileList = ({
	selectedIndex = '',
	inputref = {},
	files = [],
	changeEvent = () => {}
}) => {
	if (files) {
		files = files.map((item, i) => {
			const selected =
			selectedIndex.toString() === i.toString();

			return (
				<li
					key={item}
					value={i}
					className={selected ? styles.selected : ''}
				>
					{item}
				</li>
			);
		});
	}

	return (
		<div className={styles.filelist} tabIndex="0">
			<ul
				ref={inputref}
				value={selectedIndex}
				role="presentation"
				size="5"
				onClick={changeEvent}
			>
				{ files }
			</ul>
		</div>
	);
};

FileList.propTypes = {
	selectedIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	inputref: PropTypes.object,
	files: PropTypes.arrayOf(PropTypes.string),
	changeEvent: PropTypes.func
};

module.exports = FileList;
