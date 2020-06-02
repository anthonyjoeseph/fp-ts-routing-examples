import React from 'react';
import { defaultAppState } from '../1-global-state/AppState';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './reducer';
import ReduxApp from './ReduxApp';

let store = createStore(
  reducer,
  defaultAppState,
);

const App = () => (
  <Provider
		store={store}
	>
    <ReduxApp />
  </Provider>
);

export default App;