import React, { useReducer } from 'react';
import { render } from 'react-dom';

import Mousetrap from 'mousetrap';

import * as ActionCreators from '../actions/actionCreators';

import { initialState, notedReducer } from '../reducers/notedReducer';

import Noted from '../components/Noted';

export default function NotedApp() {
    const [state, dispatch] = useReducer(notedReducer, initialState);

    // Ensure Mousetrap fires even if focus is within input fields
    Mousetrap.prototype.stopCallback = (e, element, combo) => false;

    Mousetrap.bind(['mod+d'], () => {
        const filename = state.files[state.fileIndex];

        if (filename && confirm(`Are you sure you want to delete: ${filename}?`)) {
            dispatch(ActionCreators.deleteFile(state.allFiles, filename));
        }

        return false;
    });

    return <Noted {...state} {...ActionCreators} dispatch={dispatch} />;
}