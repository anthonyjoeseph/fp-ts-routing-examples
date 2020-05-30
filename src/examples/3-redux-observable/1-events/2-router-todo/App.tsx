import React, { useState } from 'react';
import { TodoType, defaultTodos, TodoVisibility } from '../1-simple-todo/AppState';
import AddTodo from '../1-simple-todo/components/AddTodo';
import TodoList from '../1-simple-todo/components/TodoList';
import Footer from '../1-simple-todo/components/Footer';
import { urlToTodoVisibility, todoVisibilityToUrl } from './AppRoute';

const App = () => {
  const [todos, setTodos] = useState<TodoType[]>(defaultTodos);
  const [todoVisibility, setTodoVisibility] = useState<TodoVisibility>(
    urlToTodoVisibility(window.location.href),
  );
  window.onpopstate = () => {
    setTodoVisibility(
      urlToTodoVisibility(window.location.href),
    )
  }
  const updateTodoVisibility = (newVisibility: TodoVisibility) => {
    window.history.pushState(null, '', todoVisibilityToUrl(newVisibility))
    setTodoVisibility(newVisibility)
  }
  return (
    <div>
      <AddTodo
        addTodo={(text) => {
          const highestID = todos.length < 0 
            ? todos.reduce(
                (acc, cur) => cur.id > acc.id
                  ? cur
                  : acc
              ).id
            : 0;
          const newTodo: TodoType = {
            id: highestID + 1,
            text,
            completed: false,
          }
          setTodos([...todos, newTodo]);
        }}
      />
      <TodoList
        todos={todos}
        visibility={todoVisibility}
        toggleTodo={(id) => {
          const newTodos = todos.map(
            t => t.id === id
              ? {
                ...t,
                completed: !t.completed,
              }
              : t
          );
          setTodos(newTodos);
        }}
      />
      <Footer
        todoVisibility={todoVisibility}
        setTodoVisibility={updateTodoVisibility}
      />
    </div>
  )
}

export default App;