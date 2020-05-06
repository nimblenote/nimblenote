import React, { useReducer, useRef, useEffect } from 'react';
import { render } from 'react-dom';

import styles from './styles.scss';

import * as ActionCreators from '../../actions/actionCreators';

import { initialState, notedReducer } from '../../reducers/notedReducer';

import TitleBar from '../TitleBar';
import SearchInput from '../SearchInput';
import FileList from '../FileList';
import Editor from '../Editor';

function handleKeyboard(state, dispatch, event) {
    if (['INPUT', 'DIV'].includes(event.target.tagName)) {
        if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
          event.preventDefault();

          if (state.files.length) {
            dispatch(ActionCreators.changeSelectedFile(
              state.files,
              state.fileIndex,
              event.key === 'ArrowUp'
            ));
          }
        }

        if (event.key === 'Enter') {
          if (state.searchValue.length > 0) {
            event.preventDefault();

            if (event.target.tagName === 'INPUT') {
              if (state.fileIndex === '') {
                dispatch(ActionCreators.createFile(state.searchValue));
              } else {
                dispatch(ActionCreators.selectFile(state.files, state.fileIndex));
                editorInput.current.focus();
              }
            }
          }
        }
      }

      if (event.key === 'Escape') {
        searchInput.current.focus();

        dispatch(ActionCreators.resetToInitialState());
      }
}

function handleSearch(state, dispatch, event) {
    if (event.target.value === '?') {
        dispatch(ActionCreators.showHelp());

        return true;
      }

      dispatch(ActionCreators.searchQuery(
        state.allFiles,
        event.target.value,
        state.query
      ));
}

function handleFileList(state, dispatch, event) {
    if (state.files.length) {
        dispatch(ActionCreators.selectFile(
          state.files,
          event.target.getAttribute('value') * 1
        ));
      }
}

function handleEditor(state, dispatch, event) {
    dispatch(ActionCreators.updateFile(state.searchValue, event.target.value));
}

let searchInput;
let fileList;
let editorInput;

export default function NotedApp() {
    const [state, dispatch] = useReducer(notedReducer, initialState);

    searchInput = useRef(null);
    fileList = useRef(null);
    editorInput = useRef(null);

    useEffect(() => {
        console.log('componentDidMount')
        dispatch(ActionCreators.loadFiles());
        dispatch(ActionCreators.showTitlebar());

        searchInput.current.focus();
    }, []);

    useEffect(() => {
        console.log('componentDidUpdate')
        console.log('newlyCreatedFile')
        editorInput.current.focus();
    }, [state.newlyCreatedFile]);

    useEffect(() => {
        console.log('componentDidUpdate')
        console.log('fileIndex')
        if (state.fileIndex) {
            const fileDom = fileList.current.childNodes[state.fileIndex];
            fileDom.scrollIntoViewIfNeeded();
        }
    }, [state.fileIndex]);

    useEffect(() => {
        console.log('componentDidUpdate')
        console.log('startSelection')

        if (state.startSelection !== false) {
            searchInput.current.setSelectionRange(
                state.startSelection,
                state.endSelection
              );
        }
    }, [state.startSelection]);

    return (
        <>
            <div
                className={styles.container}
                onKeyDown={e => handleKeyboard(state, dispatch, e)}
            >
                {state.titlebar ? <TitleBar /> : ''}
                <SearchInput
                    query={state.searchValue}
                    changeEvent={e => handleSearch(state, dispatch, e)}
                    inputref={searchInput}
                />
                <FileList
                    changeEvent={e => handleFileList(state, dispatch, e)}
                    files={state.files}
                    selectedIndex={state.fileIndex}
                    inputref={fileList}
                />
                <Editor
                    changeEvent={e => handleEditor(state, dispatch, e)}
                    inputref={editorInput}
                    content={state.editorContent}
                    disabled={state.editorDisabled}
                />
            </div>
        </>
    )
}