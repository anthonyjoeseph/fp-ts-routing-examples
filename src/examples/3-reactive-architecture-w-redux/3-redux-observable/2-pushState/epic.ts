import { pipe } from 'fp-ts/lib/pipeable';
import * as r from 'rxjs';
import * as ro from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { AppAction } from './AppAction';
import { AppState } from '../../1-redux/1-global-state/AppState';
import {
  visibilityFilterToRoute,
  routeToVisibilityFilter,
  parse,
  format,
} from '../../../2-data-model/4-ssot/Location';

const epic: Epic<AppAction, AppAction, AppState> = (
  action$,
) => r.merge(
  pipe(
    r.fromEvent(window, 'popstate'),
    ro.map(() => pipe(
      window.location.href,
      parse,
      routeToVisibilityFilter
    )),
    ro.map(filter => AppAction.of.SET_VISIBILITY_FILTER({
      filter,
    })),
  ),
  pipe(
    action$,
    ro.filter(AppAction.is.SET_VISIBILITY_FILTER_LOCATION),
    ro.tap(({ filter }) => pipe(
      filter,
      visibilityFilterToRoute,
      format,
      url => window.history.pushState(null, '', url),
    )),
    ro.map(({ filter }) => AppAction.of.SET_VISIBILITY_FILTER({
      filter,
    })),
  ),
);

export default epic;