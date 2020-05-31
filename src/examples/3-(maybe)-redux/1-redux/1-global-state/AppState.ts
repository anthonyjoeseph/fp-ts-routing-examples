export interface TodoType {
  id: number;
  text: string;
  completed: boolean;
}
export type VisibilityFilter = 'SHOW_ALL' | 'SHOW_ACTIVE' | 'SHOW_COMPLETED'

export const defaultTodos: TodoType[] = [
  {
    id: 0,
    text: 'Learn Redux',
    completed: false,
  },
  {
    id: 1,
    text: 'Go Shopping',
    completed: false,
  }
];

export interface AppState {
  todos: TodoType[];
  visibilityFilter: VisibilityFilter;
}

export const defaultAppState: AppState = {
  visibilityFilter: 'SHOW_ALL',
  todos: defaultTodos,
};