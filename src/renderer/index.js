import React from 'react';
import { render } from 'react-dom';

import './app.global.scss';

import NotedApp from './components/NotedApp';

render(<NotedApp />, document.getElementById('app'));