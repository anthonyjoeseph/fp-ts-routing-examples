import { pipe } from 'fp-ts/lib/pipeable';
import * as r from 'rxjs';
import * as ro from 'rxjs/operators';
import assert from 'assert';
import epic from './epic';
import { AppState } from '../../../1-redux/1-global-state/AppState';
import { Location, format } from '../../../../2-data-model/4-ssot/Location';
import { AppAction } from '../../2-pushState/AppAction';
import { StateObservable, ActionsObservable } from 'redux-observable';

test('New filters change the url', async () => {
  const urlHistoryStream = new r.Subject<string>();
  const closeStream = new r.Subject<unknown>();
  const urlHistory = pipe(
    urlHistoryStream,
    ro.takeUntil(closeStream),
    ro.toArray(),
  ).toPromise();

  const action$ = pipe(
    [
      AppAction.of.SET_VISIBILITY_FILTER_LOCATION({
        filter: 'SHOW_COMPLETED'
      }),
      AppAction.of.SET_VISIBILITY_FILTER_LOCATION({
        filter: 'SHOW_ACTIVE'
      }),
      AppAction.of.SET_VISIBILITY_FILTER_LOCATION({
        filter: 'SHOW_ALL'
      }),
    ],
    arr => ActionsObservable.from(arr)
  );
  const state$ = new StateObservable(
    new r.Subject<AppState>(),
    undefined as any,
  );
  const appEpic = epic(
    url => urlHistoryStream.next(url),
    r.empty(),
    () => '/'
  );

  await appEpic(action$, state$, null).toPromise();
  
  closeStream.next();
  await urlHistory
    .then(allPushedLocations => assert.deepStrictEqual(
      allPushedLocations,
      [
        Location.of.Completed({ value: {} }),
        Location.of.Active({ value: {} }),
        Location.of.Landing({ value: {} }),
      ].map(format)
    ))
});