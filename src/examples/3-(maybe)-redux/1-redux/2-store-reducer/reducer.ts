import { Reducer } from "redux";
import { AppState, defaultAppState, TodoType } from "../1-global-state/AppState";
import { AppAction } from "./AppAction";

export const reducer: Reducer<AppState, AppAction> = (
  state,
  action
): AppState => {
  if (state === undefined) {
    return defaultAppState;
  }
  switch (action.type) {
    case 'ADD_TODO':
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
        text: action.text,
        completed: false,
      }
      return {
        ...state,
        todos: [...todos, newTodo]
      };
    case 'SET_VISIBILITY_FILTER':
      return {
        ...state,
        visibilityFilter: action.filter,
      };
    case 'TOGGLE_TODO':
      const newTodos = todos.map(
        t => t.id === action.id
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
  }
};