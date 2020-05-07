import React from 'react';
import Noted from '.';

export default { title: 'Noted' };

const files = [
    'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
]

export const withDefaults = () => <Noted
    files={files}
    fileIndex="1"
    searchValue="one"
    editorDisabled={false}
    editorContent="Some file content
And another line here
And one more here"
    />;
export const withoutTitlebar = () => <Noted titlebar={false} files={files} />;
