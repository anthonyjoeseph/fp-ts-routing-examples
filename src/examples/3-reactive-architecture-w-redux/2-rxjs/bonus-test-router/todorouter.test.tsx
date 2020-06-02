import { pipe } from 'fp-ts/lib/pipeable';
import * as r from 'rxjs';
import * as ro from 'rxjs/operators';
import assert from 'assert';
import { safeReducer, curriedReducer } from './reducer';
import { defaultAppState } from '../../1-redux/1-global-state/AppState';
import { Location, format } from '../../../2-data-model/4-ssot/Location';
import { AppAction } from '../../1-redux/3-morphic-ts/AppAction';

test('New filters change the url', async () => {
  const urlHistoryStream = new r.Subject<string>();
  const closeStream = new r.Subject<unknown>();
  const urlHistory = pipe(
    urlHistoryStream,
    ro.takeUntil(closeStream),
    ro.toArray(),
  ).toPromise();

  const reducer = safeReducer(
    curriedReducer(
      (a) => urlHistoryStream.next(a),
    ),
    defaultAppState,
    AppAction
  )
  reducer(
    defaultAppState,
    AppAction.of.SET_VISIBILITY_FILTER({
      filter: 'SHOW_COMPLETED'
    })
  )
  reducer(
    defaultAppState,
    AppAction.of.SET_VISIBILITY_FILTER({
      filter: 'SHOW_ACTIVE'
    })
  )
  reducer(
    defaultAppState,
    AppAction.of.SET_VISIBILITY_FILTER({
      filter: 'SHOW_ALL'
    })
  )
  
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