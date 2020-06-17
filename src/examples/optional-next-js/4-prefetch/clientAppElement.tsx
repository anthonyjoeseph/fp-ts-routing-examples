import React from 'react';
import App from './App';

const clientAppElement = (): React.ReactElement => (
  <App
    initialUrl={window.location.pathname}
    prefetched=""
  />
);

export default clientAppElement;