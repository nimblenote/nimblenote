import React from 'react';
import FileList from '.';

export default {title: 'FileList'};

export const withNoFiles = () => <FileList/>;
export const withFiles = () => <FileList files={['One', 'Two', 'Three']}/>;
export const withFilesAndSelectedIndex = () => <FileList files={['One', 'Two', 'Three']} selectedIndex="1"/>;
