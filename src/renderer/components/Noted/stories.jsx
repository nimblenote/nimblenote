import React from 'react';
import Noted from '.';

export default { title: 'Noted' };

const files = [
    'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
]

export const withDefaults = () => <Noted files={files} />;
export const withoutTitlebar = () => <Noted titlebar={false} files={files} />;
