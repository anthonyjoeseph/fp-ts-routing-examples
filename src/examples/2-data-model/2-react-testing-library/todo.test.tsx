import React from 'react';
import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import App from '../1-simple-todo/App';
import { defaultTodos } from '../1-simple-todo/AppState';

describe('Todo App', () => {
  const newTodoText = 'Hot Dog Eating Contest';

  beforeEach(() => {
    render(
      <App />
    );
  });

  // Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
  // https://jestjs.io/docs/en/tutorial-react
  afterEach(cleanup);

  it('Has default todos', () => {
    defaultTodos.forEach(t => {
      const todoElement = screen.getByLabelText(`todo: ${t.text}`);
      expect(todoElement).toBeInTheDocument();
    });
  });
  it('Can add todo', () => {
    const newTodoTextElem = screen.getByLabelText(/New Todo Text/i);
    fireEvent.change(newTodoTextElem, { target: { value: newTodoText } });
    
    const addTodoButtonElem = screen.getByLabelText(/Add Todo/i);
    fireEvent.click(addTodoButtonElem);

    const newTodoElement = screen.getByLabelText(`todo: ${newTodoText}`);
    expect(newTodoElement).toBeInTheDocument();
  });
  it('Can complete/uncomplete todo', () => {
    const todoElement = screen.getByLabelText(`todo: ${defaultTodos[0].text}`);
    expect(todoElement).toBeInTheDocument();

    const styleBeforeClick = window.getComputedStyle(todoElement);
    expect(styleBeforeClick.textDecoration).toMatch(/none/i);

    fireEvent.click(todoElement);

    const styleAfterClick = window.getComputedStyle(todoElement);
    expect(styleAfterClick.textDecoration).toMatch(/line-through/i);

    fireEvent.click(todoElement);

    const styleAfterReset = window.getComputedStyle(todoElement);
    expect(styleAfterReset.textDecoration).toMatch(/none/i);
  });
  it('Can display all/active/completed todos', () => {
    const firstTodoElement = screen.getByLabelText(`todo: ${defaultTodos[0].text}`);
    expect(firstTodoElement).toBeInTheDocument();
    fireEvent.click(firstTodoElement);

    const hasElement = (index: number, has: boolean) => {
      const elem = screen.queryByLabelText(`todo: ${defaultTodos[index].text}`);
      if (has) {
        expect(elem).toBeInTheDocument();
      } else {
        expect(elem).not.toBeInTheDocument();
      }
    }

    const showCompletedTodos = screen.getByText(/Completed/i);
    expect(showCompletedTodos).toBeInTheDocument();
    const showActiveTodos = screen.getByText(/Active/i);
    expect(showActiveTodos).toBeInTheDocument();
    const showAllTodos = screen.getByText(/All/i);
    expect(showAllTodos).toBeInTheDocument();

    fireEvent.click(showActiveTodos);

    hasElement(0, false);
    hasElement(1, true);

    fireEvent.click(showCompletedTodos);

    hasElement(0, true);
    hasElement(1, false);

    fireEvent.click(showAllTodos);

    hasElement(0, true);
    hasElement(1, true);
  });
});