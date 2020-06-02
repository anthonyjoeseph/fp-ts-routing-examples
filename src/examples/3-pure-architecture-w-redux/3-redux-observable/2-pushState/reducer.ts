import { identity } from 'fp-ts/lib/function';
import { pipe } from 'fp-ts/lib/pipeable';
import * as O from 'fp-ts/lib/Option';
import { Reducer, Action } from "redux";
import { AppState, TodoType } from "../../1-redux/1-global-state/AppState";
import { AppAction, TransformAction } from './AppAction';
import { ADT } from "@morphic-ts/adt";

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

export const curriedReducer = (
  a: AppAction,
) => pipe(
  a as TransformAction,
  O.fromPredicate(TransformAction.verified),
  O.map(TransformAction.matchStrict<(a: AppState) => AppState>({
    ADD_TODO: ({ text }) => (state) => {
      const { todos } = state;
      const highestID = todos.length > 0 
        ? todos.reduce(
            (acc, cur) => cur.id > acc.id
              ? cur
              : acc
          ).id
        : 0;
      const newTodo: TodoType = {
        id: highestID + 1,
        text: text,
        completed: false,
      }
      return {
        ...state,
        todos: [...todos, newTodo]
      };
    },
    SET_VISIBILITY_FILTER: ({ filter }) => (state) => {
      return {
        ...state,
        visibilityFilter: filter,
      };
    },
    TOGGLE_TODO: ({ id }) => (state) => {
      const { todos } = state;
      const newTodos = todos.map(
        t => t.id === id
          ? {
            ...t,
            completed: !t.completed,
          }
          : t
      );
      return {
        ...state,
        todos: newTodos,
      };
    },
  })),
  O.getOrElse((): (s: AppState) => AppState => identity),
);
