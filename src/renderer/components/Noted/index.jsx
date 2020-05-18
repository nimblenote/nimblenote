const React = require('react');
const PropTypes = require('prop-types');
const {useRef, useEffect} = require('react');
const styles = require('./styles.scss');
const TitleBar = require('../TitleBar');
const SearchInput = require('../SearchInput');
const FileList = require('../FileList');
const Editor = require('../Editor');

const notedPropTypes = {
	loadFiles: PropTypes.func,
	createFile: PropTypes.func,
	selectFile: PropTypes.func,
	showHelp: PropTypes.func,
	showTitlebar: PropTypes.func,
	changeSelectedFile: PropTypes.func,
	updateFile: PropTypes.func,
	searchQuery: PropTypes.func,
	resetToInitialState: PropTypes.func,
	newlyCreatedFile: PropTypes.bool,
	fileIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	allFiles: PropTypes.arrayOf(PropTypes.string),
	files: PropTypes.arrayOf(PropTypes.string),
	startSelection: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
	endSelection: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
	searchValue: PropTypes.string,
	query: PropTypes.string,
	editorContent: PropTypes.string,
	editorDisabled: PropTypes.bool,
	titlebar: PropTypes.bool,
	focusOnSearch: PropTypes.bool,
	dispatch: PropTypes.func,
	onInit: PropTypes.func,
	onReady: PropTypes.func
};

const Noted = ({
	loadFiles = () => {},
	createFile = () => {},
	selectFile = () => {},
	changeSelectedFile = () => {},
	updateFile = () => {},
	searchQuery = () => {},
	resetToInitialState = () => {},
	showHelp = () => {},
	showTitlebar = () => {},
	newlyCreatedFile = false,
	fileIndex = '',
	allFiles = [],
	files = [],
	searchValue = '',
	query = '',
	startSelection = false,
	endSelection = false,
	editorContent = '',
	editorDisabled = true,
	titlebar = true,
	focusOnSearch = true,
	dispatch = () => {},
	onInit = () => {},
	onReady = () => {}
}) => {
	const searchInput = useRef(null);
	const fileList = useRef(null);
	const editorInput = useRef(null);

	const handleKeyboard = event => {
		if (['INPUT', 'DIV'].includes(event.target.tagName)) {
			if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
				event.preventDefault();

				if (files.length > 0) {
					dispatch(changeSelectedFile(
						files,
						fileIndex,
						event.key === 'ArrowUp'
					));
				}
			} else if (event.key === 'Enter') {
				if (searchValue.length > 0) {
					event.preventDefault();

					if (event.target.tagName === 'INPUT') {
						if (fileIndex === '') {
							dispatch(createFile(searchValue));
						} else {
							dispatch(selectFile(files, fileIndex));
							editorInput.current.focus();
						}
					}
				}
			}
		}

		if (event.key === 'Escape') {
			searchInput.current.focus();

			dispatch(resetToInitialState());
		}
	};

	const handleSearch = event => {
		if (event.target.value === '?') {
			dispatch(showHelp());

			return true;
		}

		dispatch(searchQuery(
			allFiles,
			event.target.value,
			query));
	};

	const handleFileList = event => {
		if (files.length > 0) {
			dispatch(selectFile(
				files,
				Number(event.target.getAttribute('value'))));
		}
	};

	const handleEditor = event => {
		dispatch(updateFile(searchValue, event.target.value));
	};

	useEffect(() => {
		onInit();

		console.log('componentDidMount');
		dispatch(loadFiles());
		dispatch(showTitlebar());

		searchInput.current.focus();

		onReady();
	}, []);

	useEffect(() => {
		if (focusOnSearch) {
			searchInput.current.focus();
		}
	}, [focusOnSearch]);

	useEffect(() => {
		console.log('componentDidUpdate');
		console.log('newlyCreatedFile');
		editorInput.current.focus();
	}, [newlyCreatedFile]);

	useEffect(() => {
		console.log('componentDidUpdate');
		console.log('fileIndex');

		if (fileIndex) {
			const fileDom = fileList.current.childNodes[fileIndex];
			fileDom.scrollIntoViewIfNeeded();
		}
	}, [fileIndex]);

	useEffect(() => {
		console.log('componentDidUpdate');
		console.log('startSelection');

		if (startSelection !== false) {
			searchInput.current.setSelectionRange(
				startSelection,
				endSelection);
		}
	}, [startSelection]);

	return (
		<div
			className={styles.container}
			onKeyDown={event => handleKeyboard(event)}
		>
			{titlebar ? <TitleBar/> : ''}
			<SearchInput
				query={searchValue}
				changeEvent={event => handleSearch(event)}
				inputref={searchInput}
			/>
			<FileList
				changeEvent={event => handleFileList(event)}
				files={files}
				selectedIndex={fileIndex}
				inputref={fileList}
			/>
			<Editor
				changeEvent={event => handleEditor(event)}
				inputref={editorInput}
				content={editorContent}
				disabled={editorDisabled}
			/>
		</div>
	);
};

Noted.propTypes = notedPropTypes;

module.exports = Noted;
