import { flow } from 'fp-ts/lib/function';
import { pipe } from 'fp-ts/lib/pipeable';
import { ordNumber } from 'fp-ts/lib/Ord';
import { getJoinSemigroup } from 'fp-ts/lib/Semigroup';
import * as O from 'fp-ts/lib/Option';
import * as NEA from 'fp-ts/lib/NonEmptyArray';
import * as A from 'fp-ts/lib/Array';
import * as M from 'monocle-ts';
import { Reducer, Action } from "redux";
import { AppState, TodoType } from "../1-global-state/AppState";
import { AppAction } from "../3-morphic-ts/AppAction";
import { ADT } from '@morphic-ts/adt';

export const safeReducer = <A extends Action, S, tag extends keyof A & string>(
  curriedReducer: (a: A) => (s: S) => S,
  defaultState: S,
  adt: ADT<A, tag>
): Reducer<S, A> => (
  nullableState,
  action
) => {
  if (!nullableState || !adt.verified(action)) return defaultState;
  return curriedReducer(action)(nullableState);
}

export const curriedReducer = AppAction.matchStrict<(a: AppState) => AppState>({
  ADD_TODO: ({ text }) => M.Lens
    .fromProp<AppState>()('todos')
    .modify(ts => pipe(
      ts,
      NEA.fromArray,
      O.map(flow(
        NEA.map(t => t.id),
        NEA.fold(getJoinSemigroup(ordNumber)),
        highestID => highestID + 1,
      )),
      O.getOrElse(() => 0),
      id => A.snoc(
        ts,
        { id, text, completed: false }
      ),
    )),
  SET_VISIBILITY_FILTER: ({ filter }) => M.Lens
    .fromProp<AppState>()('visibilityFilter')
    .set(filter),
  TOGGLE_TODO: ({ id }) => M.Lens
    .fromProp<AppState>()('todos')
    .composeTraversal(M.fromTraversable(A.array)<TodoType>())
    .filter(t => t.id === id)
    .composeLens(M.Lens.fromProp<TodoType>()('completed'))
    .modify(completed => !completed),
});
