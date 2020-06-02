import React from 'react';
import { defaultAppState } from '../1-global-state/AppState';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { safeReducer, curriedReducer } from './reducer';
import ReduxApp from './ReduxApp';
import { AppAction } from './AppAction';

let store = createStore(
  safeReducer(curriedReducer, defaultAppState, AppAction),
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