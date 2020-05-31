import React from 'react';
import { AppState } from '../1-global-state/AppState';
import AddTodo from '../../../2-data-model/1-simple-todo/components/AddTodo';
import TodoList from '../../../2-data-model/1-simple-todo/components/TodoList';
import Footer from '../../../2-data-model/1-simple-todo/components/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { AppAction } from './AppAction';

const ReduxApp = () => {
  const state = useSelector<AppState, AppState>(s => s);
  const dispatch = useDispatch<(a: AppAction) => void>();
  const {
    todos,
    visibilityFilter,
  } = state;
  return (
    <div>
      <AddTodo
        addTodo={(text) => {
          dispatch({
            type: 'ADD_TODO',
            text,
          })
        }}
      />
      <TodoList
        todos={todos}
        visibility={visibilityFilter}
        toggleTodo={(id) => {
          dispatch({
            type: 'TOGGLE_TODO',
            id,
          });
        }}
      />
      <Footer
        visibilityFilter={visibilityFilter}
        setVisibilityFilter={(newVisibility) => {
          dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: newVisibility,
          });
        }}
      />
    </div>
  )
}

export default ReduxApp;