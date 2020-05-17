import React from 'react';
import { render } from 'react-dom';

import './app.global.scss';

import NotedApp from './containers/noted-app';

render(<NotedApp />, document.getElementById('app'));
