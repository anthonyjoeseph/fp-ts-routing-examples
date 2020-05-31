import React, { useState } from 'react';
import { TodoType, defaultTodos, VisibilityFilter } from './AppState';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

const App = () => {
  const [todos, setTodos] = useState<TodoType[]>(defaultTodos);
  const [visibilityFilter, setVisibilityFilter] = useState<VisibilityFilter>('SHOW_ALL');
  return (
    <div>
      <AddTodo
        addTodo={(text) => {
          const highestID = todos.length > 0 
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
        visibility={visibilityFilter}
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
        visibilityFilter={visibilityFilter}
        setVisibilityFilter={setVisibilityFilter}
      />
    </div>
  )
}

export default App;