import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import React from 'react';
import { Provider } from 'react-redux';
import ReduxApp from '../../1-redux/3-morphic-ts/ReduxApp';
import { safeReducer, curriedReducer } from '../../1-redux/5-router-attempt/reducer';
import { defaultAppState, AppState } from '../../1-redux/1-global-state/AppState';
import { AppAction } from '../../1-redux/3-morphic-ts/AppAction';
import { routeToVisibilityFilter, parse } from '../../../2-data-model/4-ssot/Location';
import epic from './epic';

const epicMiddleware = createEpicMiddleware<AppAction, AppAction, AppState>();

let store = createStore(
  safeReducer(
    curriedReducer,
      {
      ...defaultAppState,
      visibilityFilter: routeToVisibilityFilter(
        parse(
          window.location.href
        )
      ),
    },
    AppAction,
  ),
  defaultAppState,
  applyMiddleware(
    epicMiddleware,
  ),
);

epicMiddleware.run(epic);

const App = () => (
  <Provider
		store={store}
	>
    <ReduxApp />
  </Provider>
);

export default App;
