import { pipe } from 'fp-ts/lib/pipeable';
import * as r from 'rxjs';
import * as ro from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { AppAction } from '../../2-pushState/AppAction';
import { AppState } from '../../../1-redux/1-global-state/AppState';
import {
  visibilityFilterToRoute,
  routeToVisibilityFilter,
  parse,
  format,
} from '../../../../2-data-model/4-ssot/Location';

const epic = (
  pushUrl: (url: string) => void,
  popstate$: r.Observable<unknown>,
  hrefThunk: () => string,
): Epic<AppAction, AppAction, AppState> => (
  action$,
) => r.merge(
  pipe(
    popstate$,
    ro.map(() => {
      const four = 3;
      return pipe(
        hrefThunk(),
        parse,
        routeToVisibilityFilter
      );
    }),
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
      pushUrl,
    )),
    ro.map(({ filter }) => {
      return AppAction.of.SET_VISIBILITY_FILTER({
        filter,
      });
    }),
  ),
);

export default epic;