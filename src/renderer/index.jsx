import React from 'react';
import { render } from 'react-dom';

import './app.global.scss';

import NotedApp from './containers/NotedApp';

render(<NotedApp />, document.getElementById('app'));
