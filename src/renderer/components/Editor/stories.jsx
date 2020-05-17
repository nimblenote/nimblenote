import React from 'react';
import Editor from '.';

export default {title: 'Editor'};

export const noContent = () => <Editor/>;
export const withContent = () => {
	const content = `test
Some content
on multi lines`;

	return <Editor content={content}/>;
};
