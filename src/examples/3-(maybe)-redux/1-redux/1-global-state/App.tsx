import React, { useState } from 'react';
import { TodoType, defaultAppState, AppState } from './AppState';
import AddTodo from '../../../2-data-model/1-simple-todo/components/AddTodo';
import TodoList from '../../../2-data-model/1-simple-todo/components/TodoList';
import Footer from '../../../2-data-model/1-simple-todo/components/Footer';

const App = () => {
  const [state, setState] = useState<AppState>(defaultAppState);
  const {
    todos,
    visibilityFilter,
  } = state;
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
          setState({
            ...state,
            todos: [...todos, newTodo]
          });
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
          setState({
            ...state,
            todos: newTodos,
          });
        }}
      />
      <Footer
        visibilityFilter={visibilityFilter}
        setVisibilityFilter={(newVisibility) => {
          setState({
            ...state,
            visibilityFilter: newVisibility,
          });
        }}
      />
    </div>
  )
}

export default App;