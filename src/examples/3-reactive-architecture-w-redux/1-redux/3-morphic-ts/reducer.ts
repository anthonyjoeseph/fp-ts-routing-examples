import { Reducer, Action } from "redux";
import { AppState, TodoType } from "../1-global-state/AppState";
import { AppAction } from "./AppAction";
import { ADT } from "@morphic-ts/adt";

/* const safeReducer = (
  curriedReducer: (a: AppAction) => (s: AppState) => AppState,
): Reducer<AppState, AppAction> => (
  nullableState,
  action
) => {
  if (!nullableState || !AppAction.verified(action)) return defaultAppState;
  return curriedReducer(action)(nullableState);
} */

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
});