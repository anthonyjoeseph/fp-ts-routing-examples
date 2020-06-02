import React from 'react';
import { AppState } from '../1-global-state/AppState';
import AddTodo from '../../../2-data-model/1-simple-todo/components/AddTodo';
import TodoList from '../../../2-data-model/1-simple-todo/components/TodoList';
import Footer from '../../../2-data-model/1-simple-todo/components/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { AppAction } from '../3-morphic-ts/AppAction';
import { parse, routeToVisibilityFilter } from '../../../2-data-model/4-ssot/Location';

const ReduxApp = () => {
  const state = useSelector<AppState, AppState>(s => s);
  const dispatch = useDispatch<(a: AppAction) => void>();
  const {
    todos,
    visibilityFilter,
  } = state;
  window.onpopstate = () => {
    dispatch(
      AppAction.of.SET_VISIBILITY_FILTER({
        filter: routeToVisibilityFilter(
          parse(
            window.location.href,
          )
        ),
      })
    );
  }
  return (
    <div>
      <AddTodo
        addTodo={(text) => {
          dispatch(
            AppAction.of.ADD_TODO({ text })
          )
        }}
      />
      <TodoList
        todos={todos}
        visibility={visibilityFilter}
        toggleTodo={(id) => {
          dispatch(
            AppAction.of.TOGGLE_TODO({ id })
          );
        }}
      />
      <Footer
        visibilityFilter={visibilityFilter}
        setVisibilityFilter={(filter) => {
          dispatch(
            AppAction.of.SET_VISIBILITY_FILTER({ filter })
          );
        }}
      />
    </div>
  )
}

export default ReduxApp;