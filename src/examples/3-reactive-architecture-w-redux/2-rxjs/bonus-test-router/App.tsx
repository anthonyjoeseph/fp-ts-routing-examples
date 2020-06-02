import React from 'react';
import { defaultAppState } from '../../1-redux/1-global-state/AppState';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { safeReducer, curriedReducer } from './reducer';
import ReduxApp from '../../1-redux/5-router-attempt/ReduxApp';
import { AppAction } from '../../1-redux/3-morphic-ts/AppAction';
import { routeToVisibilityFilter, parse } from '../../../2-data-model/4-ssot/Location';

let store = createStore(
  safeReducer(
    curriedReducer(
      url => window.history.pushState(null, '', url),
    ),
    {
      ...defaultAppState,
      visibilityFilter: routeToVisibilityFilter(
        parse(
          window.location.href
        )
      ),
    },
    AppAction
  ),
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