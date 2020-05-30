import React from 'react';
import Todo from './Todo';
import { TodoVisibility, TodoType } from '../AppState';

const TodoList = ({
  todos,
  visibility,
  toggleTodo
}: {
  todos: TodoType[];
  visibility: TodoVisibility;
  toggleTodo: (id: number) => void;
}) => {
  let visibileTodos: TodoType[];
  switch (visibility) {
    case 'SHOW_ALL':
      visibileTodos = todos;
      break;
    case 'SHOW_ACTIVE':
      visibileTodos = todos.filter(t => !t.completed);
      break;
    case 'SHOW_COMPLETED':
      visibileTodos = todos.filter(t => t.completed);
      break;
  }
  return (
    <ul>
      {visibileTodos.map(todo => (
        <Todo
          key={todo.id}
          {...todo}
          onClick={() => toggleTodo(todo.id)}
        />
      ))}
    </ul>
  )
}

export default TodoList;