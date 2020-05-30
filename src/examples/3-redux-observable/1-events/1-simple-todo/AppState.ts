export interface TodoType {
  id: number;
  text: string;
  completed: boolean;
}
export type TodoVisibility = 'SHOW_ALL' | 'SHOW_ACTIVE' | 'SHOW_COMPLETED'

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
]