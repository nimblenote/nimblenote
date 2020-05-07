import React, { useReducer, useRef, useEffect } from 'react';
import { render } from 'react-dom';

import styles from './styles.scss';

import TitleBar from '../TitleBar';
import SearchInput from '../SearchInput';
import FileList from '../FileList';
import Editor from '../Editor';

export default function Noted({
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
  dispatch = () => {},
}) {
  const searchInput = useRef(null);
  const fileList = useRef(null);
  const editorInput = useRef(null);

  const handleKeyboard = (event) => {
    if (['INPUT', 'DIV'].includes(event.target.tagName)) {
        if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
          event.preventDefault();

          if (files.length) {
            dispatch(changeSelectedFile(
              files,
              fileIndex,
              event.key === 'ArrowUp'
            ));
          }
        }

        if (event.key === 'Enter') {
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
  }

  const handleSearch = (event) => {
      if (event.target.value === '?') {
          dispatch(showHelp());

          return true;
        }

        dispatch(searchQuery(
          allFiles,
          event.target.value,
          query
        ));
  }

  const handleFileList = (event) => {
      if (files.length) {
          dispatch(selectFile(
            files,
            event.target.getAttribute('value') * 1
          ));
        }
  }

  const handleEditor = (event) => {
      dispatch(updateFile(searchValue, event.target.value));
  }

  useEffect(() => {
      console.log('componentDidMount')
      dispatch(loadFiles());
      dispatch(showTitlebar());

      searchInput.current.focus();
  }, []);

  useEffect(() => {
      console.log('componentDidUpdate')
      console.log('newlyCreatedFile')
      editorInput.current.focus();
  }, [newlyCreatedFile]);

  useEffect(() => {
      console.log('componentDidUpdate')
      console.log('fileIndex')
      if (fileIndex) {
          const fileDom = fileList.current.childNodes[fileIndex];
          fileDom.scrollIntoViewIfNeeded();
      }
  }, [fileIndex]);

  useEffect(() => {
      console.log('componentDidUpdate')
      console.log('startSelection')

      if (startSelection !== false) {
          searchInput.current.setSelectionRange(
              startSelection,
              endSelection
            );
      }
  }, [startSelection]);

  return (
      <>
          <div
              className={styles.container}
              onKeyDown={e => handleKeyboard(e)}
          >
              {titlebar ? <TitleBar /> : ''}
              <SearchInput
                  query={searchValue}
                  changeEvent={e => handleSearch(e)}
                  inputref={searchInput}
              />
              <FileList
                  changeEvent={e => handleFileList(e)}
                  files={files}
                  selectedIndex={fileIndex}
                  inputref={fileList}
              />
              <Editor
                  changeEvent={e => handleEditor(e)}
                  inputref={editorInput}
                  content={editorContent}
                  disabled={editorDisabled}
              />
          </div>
      </>
  )
}