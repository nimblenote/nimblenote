import React, { useReducer } from 'react';
import { render } from 'react-dom';

import * as ActionCreators from '../actions/actionCreators';

import { initialState, notedReducer } from '../reducers/notedReducer';

import Noted from '../components/Noted';

export default function NotedApp() {
    const [state, dispatch] = useReducer(notedReducer, initialState);

    return <Noted {...state} {...ActionCreators} dispatch={dispatch} />;
}