const React = require('react');
const PropTypes = require('prop-types');
const styles = require('./styles.scss');

const FileList = ({
	selectedIndex = '',
	inputref = {},
	files = [],
	fileListHeight = '95px',
	changeEvent = () => {},
	resizeEvent = () => {}
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

	const list = (
		<ul
			ref={inputref}
			value={selectedIndex}
			role="presentation"
			size="5"
			style={{height: fileListHeight}}
			onClick={changeEvent}
		>
			{ files }
		</ul>
	);

	let startY;
	let startHeight;
	let newHeight;

	const startDrag = event => {
		startY = event.clientY;
		startHeight = Number.parseInt(document.defaultView.getComputedStyle(list.ref.current).height, 10);

		document.documentElement.addEventListener('mousemove', doDrag, false);
		document.documentElement.addEventListener('mouseup', stopDrag, false);
	};

	const doDrag = event => {
		newHeight = (startHeight + event.clientY - startY);

		if (newHeight <= 50) {
			newHeight = 50;
		} else if (newHeight > 300) {
			newHeight = 300;
		}

		newHeight = `${newHeight}px`;

		resizeEvent(newHeight);
	};

	const stopDrag = _ => {
		document.documentElement.removeEventListener('mousemove', doDrag, false);
		document.documentElement.removeEventListener('mouseup', stopDrag, false);
	};

	return (
		<div className={styles.filelist} tabIndex="0">
			{list}
			<div className={styles.resizer} onMouseDown={startDrag}/>
		</div>
	);
};

FileList.propTypes = {
	selectedIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	inputref: PropTypes.object,
	files: PropTypes.arrayOf(PropTypes.string),
	fileListHeight: PropTypes.string,
	changeEvent: PropTypes.func,
	resizeEvent: PropTypes.func
};

module.exports = FileList;
