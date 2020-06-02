import React from 'react';
import { defaultAppState, AppState } from '../1-global-state/AppState';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { AppAction } from '../3-morphic-ts/AppAction';
import { safeReducer, curriedReducer } from './reducer';
import ReduxApp from '../3-morphic-ts/ReduxApp';

let store = createStore<AppState, AppAction, {}, {}>(
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