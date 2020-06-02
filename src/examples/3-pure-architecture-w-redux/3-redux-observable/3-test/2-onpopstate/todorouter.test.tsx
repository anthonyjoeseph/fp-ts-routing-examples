import { pipe } from 'fp-ts/lib/pipeable';
import * as r from 'rxjs';
import * as ro from 'rxjs/operators';
import assert from 'assert';
import epic from '../1-pushState/epic';
import { AppState, VisibilityFilter } from '../../../1-redux/1-global-state/AppState';
import { Location, format } from '../../../../2-data-model/4-ssot/Location';
import { AppAction } from '../../2-pushState/AppAction';
import { StateObservable, ActionsObservable } from 'redux-observable';

test('New filters change the url', async () => {
  const href$ = new r.BehaviorSubject<string>('/');
  
  const popUrls = [
    Location.of.Completed({ value: {} }),
    Location.of.Active({ value: {} }),
    Location.of.Landing({ value: {} }),
  ]
  const popUrls$ = pipe(
    popUrls,
    a => r.from(a),
    ro.map(format),
  );

  const pushActions = [
    AppAction.of.SET_VISIBILITY_FILTER_LOCATION({
      filter: 'SHOW_COMPLETED'
    }),
    AppAction.of.SET_VISIBILITY_FILTER_LOCATION({
      filter: 'SHOW_ACTIVE'
    }),
    AppAction.of.SET_VISIBILITY_FILTER_LOCATION({
      filter: 'SHOW_ALL'
    }),
  ];
  const action$ = pipe(
    pushActions,
    arr => r.from(arr),
    obs => ActionsObservable.from(obs),
  );
  const state$ = new StateObservable(
    new r.Subject<AppState>(),
    undefined as any,
  );

  const appEpic = epic(
    () => {},
    href$,
    () => href$.getValue(),
  );

  const emittedActions = await pipe(
    appEpic(action$, state$, null),
    ro.map((a, index) => {
      // after the initial route
      if (index === 1) {
        popUrls$.subscribe((a) => href$.next(a))
      }
      if (index === popUrls.length + 1) {
        href$.complete();
      }
      return a;
    }),
    ro.toArray(),
  ).toPromise();

  assert.deepStrictEqual(
    emittedActions,
    [
      // initial value
      'SHOW_ALL' as VisibilityFilter,

      // popped
      'SHOW_COMPLETED' as VisibilityFilter,
      'SHOW_ACTIVE' as VisibilityFilter,
      'SHOW_ALL' as VisibilityFilter,

      // pushed
      'SHOW_COMPLETED' as VisibilityFilter,
      'SHOW_ACTIVE' as VisibilityFilter,
      'SHOW_ALL' as VisibilityFilter,
    ].map(
      filter => AppAction.of.SET_VISIBILITY_FILTER({ filter })
    ),
  );
});