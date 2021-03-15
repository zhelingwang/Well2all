import * as React from 'react';
import { render } from 'react-dom';
import InnerLayout from './layout';
import { registerSW } from './pages/todo/serviceWorker/index';
registerSW();
render(
  <InnerLayout />,
  document.getElementById('root')
);