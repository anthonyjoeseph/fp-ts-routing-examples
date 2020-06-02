import React, { useState } from 'react';
import { TodoType, defaultTodos, VisibilityFilter } from '../1-simple-todo/AppState';
import AddTodo from '../1-simple-todo/components/AddTodo';
import TodoList from '../1-simple-todo/components/TodoList';
import Footer from '../1-simple-todo/components/Footer';
import { routeToVisibilityFilter, visibilityFilterToRoute, parse, format } from './Location';

const App = () => {
  const [todos, setTodos] = useState<TodoType[]>(defaultTodos);
  const [visibilityFilter, setVisibilityFilter] = useState<VisibilityFilter>(
    routeToVisibilityFilter(
      parse(
        window.location.href
      )
    ),
  );
  window.onpopstate = () => {
    setVisibilityFilter(
      routeToVisibilityFilter(
        parse(
          window.location.href,
        )
      )
    )
  }
  const updateVisibilityFilter = (newVisibility: VisibilityFilter) => {
    window.history.pushState(
      null,
      '',
      format(
        visibilityFilterToRoute(
          newVisibility
        )
      )
    )
    setVisibilityFilter(newVisibility)
  }
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
        setVisibilityFilter={updateVisibilityFilter}
      />
    </div>
  )
}

export default App;