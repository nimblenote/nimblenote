import React from 'react';
import { addDecorator } from '@storybook/react';

addDecorator(story => (
  <div style={{ width: 400, height: 400, position: 'relative' }}>{story()}</div>
));