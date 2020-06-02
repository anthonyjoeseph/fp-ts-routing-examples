import { curriedReducer, safeReducer } from '../3-morphic-ts/reducer';
import { AppAction } from '../3-morphic-ts/AppAction';
import { defaultAppState, TodoType, VisibilityFilter } from '../1-global-state/AppState';

describe('Todo App Reducer', () => {

  const reducer = safeReducer(curriedReducer, defaultAppState, AppAction);

  it('Can add a todo', () => {
    const newTodoText = 'Hot Dog Eating Contest'
    const newState = reducer(
      defaultAppState,
      AppAction.of.ADD_TODO({
        text: newTodoText,
      })
    )
    expect(newState.todos)
      .toContainEqual<TodoType>({
        completed: false,
        id: 2,
        text: newTodoText,
      });
  });
  it('Can set the visibility filter', () => {
    expect(defaultAppState.visibilityFilter)
      .toMatch('SHOW_ALL' as VisibilityFilter)
    const newState = reducer(
      defaultAppState,
      AppAction.of.SET_VISIBILITY_FILTER({
        filter: 'SHOW_ACTIVE'
      })
    )
    expect(newState.visibilityFilter)
      .toMatch('SHOW_ACTIVE' as VisibilityFilter);
  });
  it('Can toggle a todo\'s completion', () => {
    const testID = 0;
    expect(
      defaultAppState
        .todos
        .find(t => t.id === testID)
        ?.completed
      )
      .toBeFalsy()
    const newState = reducer(
      defaultAppState,
      AppAction.of.TOGGLE_TODO({
        id: testID,
      })
    )
    expect(
      newState
        .todos
        .find(t => t.id === testID)
        ?.completed
      )
      .toBeTruthy()
  });
});