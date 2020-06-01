const React = require('react');
const Mousetrap = require('mousetrap');
const PropTypes = require('prop-types');
const {useRef, useEffect} = require('react');
const styles = require('./styles.scss');
const TitleBar = require('../TitleBar');
const SearchInput = require('../SearchInput');
const FileList = require('../FileList');
const Editor = require('../Editor');
const MarkdownAction = require('../../../lib/markdown-action');

const nimbleNotePropTypes = {
	loadFiles: PropTypes.func,
	createFile: PropTypes.func,
	selectFile: PropTypes.func,
	showHelp: PropTypes.func,
	showTitlebar: PropTypes.func,
	resizeFileList: PropTypes.func,
	persistFileListSize: PropTypes.func,
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
	fileListHeight: PropTypes.number,
	dispatch: PropTypes.func,
	onInit: PropTypes.func,
	onReady: PropTypes.func
};

const NimbleNote = ({
	loadFiles = () => {},
	createFile = () => {},
	selectFile = () => {},
	changeSelectedFile = () => {},
	updateFile = () => {},
	searchQuery = () => {},
	resetToInitialState = () => {},
	showHelp = () => {},
	showTitlebar = () => {},
	resizeFileList = () => {},
	persistFileListSize = () => {},
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
	fileListHeight = 95,
	dispatch = () => {},
	onInit = () => {},
	onReady = () => {}
}) => {
	const searchInput = useRef(null);
	const fileList = useRef(null);
	const editorInput = useRef(null);

	Mousetrap.bind('alt+enter', () => {
		const action = new MarkdownAction({text: editorContent});
		const {line, ch} = editorInput.current.editor.getCursor();
		const result = action.atCursor({line, ch});

		if (result) {
			if (result.type === 'checkbox') {
				dispatch(updateFile(searchValue, result.text));
				focusEditorIntoView(line, ch);
			}
		}
	});

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
							focusEditorIntoView();
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

	const handleFileListResize = newSize => {
		dispatch(resizeFileList(newSize));
	};

	const handleEditor = event => {
		dispatch(updateFile(searchValue, event.target.value));
	};

	const focusEditorIntoView = (line = 0, ch = 0) => {
		editorInput.current.editor.focus();
		editorInput.current.editor.setCursor(line, ch);
		editorInput.current.editor.scrollIntoView();
		editorInput.current.editor.refresh();
	};

	useEffect(() => {
		onInit();

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
		focusEditorIntoView();
	}, [newlyCreatedFile]);

	useEffect(() => {
		if (fileIndex) {
			const fileDom = fileList.current.childNodes[fileIndex];
			fileDom.scrollIntoViewIfNeeded();
		}
	}, [fileIndex]);

	useEffect(() => {
		if (startSelection !== false) {
			searchInput.current.setSelectionRange(
				startSelection,
				endSelection);
		}
	}, [startSelection, endSelection]);

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
				resizeEvent={handleFileListResize}
				finishResizeEvent={persistFileListSize}
				files={files}
				selectedIndex={fileIndex}
				inputref={fileList}
				fileListHeight={fileListHeight}
			/>
			<Editor
				changeEvent={event => handleEditor(event)}
				inputref={editorInput}
				content={editorContent}
				isDisabled={editorDisabled}
			/>
		</div>
	);
};

NimbleNote.propTypes = nimbleNotePropTypes;

module.exports = NimbleNote;
