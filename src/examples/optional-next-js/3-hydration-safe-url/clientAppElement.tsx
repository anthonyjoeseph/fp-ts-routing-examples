import React from 'react';
import App from '../2-flicker/App';

const clientAppElement = (): React.ReactElement => (
  <App
    initialUrl={window.location.pathname}
  />
);

export default clientAppElement;