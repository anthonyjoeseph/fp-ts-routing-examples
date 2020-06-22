import React, { useState } from 'react';
import { TodoType, defaultTodos, VisibilityFilter } from '../1-simple-todo/AppState';
import AddTodo from '../1-simple-todo/components/AddTodo';
import TodoList from '../1-simple-todo/components/TodoList';
import Footer from '../1-simple-todo/components/Footer';
import { parse, Location, format } from './Location';

const routeToVisibilityFilter = Location.matchStrict<VisibilityFilter>({
  Landing: () => 'SHOW_ALL',
  Active: () => 'SHOW_ACTIVE',
  Completed: () => 'SHOW_COMPLETED',
  NotFound: () => 'SHOW_ALL',
})

const App = () => {
  const [todos, setTodos] = useState<TodoType[]>(defaultTodos);
  const [visibilityFilter, setVisibilityFilter] = useState<VisibilityFilter>(
    routeToVisibilityFilter(
      parse(
        window.location.pathname
      )
    ),
  );
  const [location, setLocation] = useState(
    parse(
      window.location.pathname
    )
  );
  window.addEventListener('popstate', () => {
    const newLocation = parse(window.location.pathname)
    setLocation(
      newLocation
    );
    setVisibilityFilter(
      routeToVisibilityFilter(
        newLocation,
      )
    );
  });
  const updateVisibilityFilter = (newVisibility: VisibilityFilter) => {
    let newRoute: Location;
    switch (newVisibility) {
      case 'SHOW_ALL':
        newRoute = Location.of.Landing({ value: {} });
        break;
      case 'SHOW_ACTIVE':
        newRoute = Location.of.Active({ value: {} });
        break;
      case 'SHOW_COMPLETED':
        newRoute = Location.of.Completed({ value: {} });
        break;
    }
    window.history.pushState(null, '', format(newRoute))
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