import { pipe } from 'fp-ts/lib/pipeable';
import * as r from 'rxjs';
import * as ro from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { AppAction } from '../../1-redux/3-morphic-ts/AppAction';
import { AppState } from '../../1-redux/1-global-state/AppState';
import { parse, routeToVisibilityFilter } from '../../../2-data-model/4-ssot/Location';

const epic: Epic<AppAction, AppAction, AppState> = () => pipe(
  r.fromEvent(window, 'popstate'),
  ro.map(() => AppAction.of.SET_VISIBILITY_FILTER({
    filter: pipe(
      window.location.href,
      parse,
      routeToVisibilityFilter
    ),
  })),
)

export default epic;