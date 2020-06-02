import { VisibilityFilter } from "../1-global-state/AppState";

export interface ADD_TODO {
  type: 'ADD_TODO',
  text: string;
}
export interface SET_VISIBILITY_FILTER {
  type: 'SET_VISIBILITY_FILTER',
  filter: VisibilityFilter,
}
export interface TOGGLE_TODO {
  type: 'TOGGLE_TODO',
  id: number;
}

export type AppAction = ADD_TODO | SET_VISIBILITY_FILTER | TOGGLE_TODO