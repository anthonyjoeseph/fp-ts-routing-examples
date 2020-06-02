import React from 'react';
import MockableApp from "./MockableApp";


export const App = () => (
  <MockableApp
    pushUrl={url => window.history.pushState(null, '', url) }
  />
);