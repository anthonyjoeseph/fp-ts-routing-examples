import * as r from 'rxjs';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import React from 'react';
import { Provider } from 'react-redux';
import ReduxApp from '../../2-pushState/ReduxApp';
import { safeReducer, curriedReducer } from '../../2-pushState/reducer';
import { defaultAppState, AppState } from '../../../1-redux/1-global-state/AppState';
import { AppAction } from '../../2-pushState/AppAction';
import { routeToVisibilityFilter, parse } from '../../../../2-data-model/4-ssot/Location';
import epic from './epic';

const epicMiddleware = createEpicMiddleware<AppAction, AppAction, AppState>();

let store = createStore(
  safeReducer(
    curriedReducer,
      {
      ...defaultAppState,
      visibilityFilter: routeToVisibilityFilter(
        parse(
          window.location.pathname
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

epicMiddleware.run(
  epic(
    url => window.history.pushState(null, '', url),
    r.fromEvent(window, 'popstate'),
    () => window.location.pathname,
  )
);

const App = () => (
  <Provider
		store={store}
	>
    <ReduxApp />
  </Provider>
);


