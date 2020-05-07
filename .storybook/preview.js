import React from 'react';
import { addDecorator } from '@storybook/react';

import '../src/renderer/app.global.scss';

addDecorator(story => (
  <div style={{
    background: '#21252b',
    width: 400,
    height: 400,
    position: 'relative'
  }}>{story()}</div>
));