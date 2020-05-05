import path from 'path';
import React from 'react';
import { render } from 'react-dom';

import styles from './styles.scss';

import TitleBar from '../TitleBar';
import SearchInput from '../SearchInput';
import FileList from '../FileList';
import Editor from '../Editor';

export default function NotedApp() {
    return (
        <>
            <div className={styles.container}>
                <TitleBar />
                <SearchInput />
                <FileList />
                <Editor />
            </div>
        </>
    )
}