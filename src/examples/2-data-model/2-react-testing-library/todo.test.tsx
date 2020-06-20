import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
      const todoElement = screen.getByRole('listitem', { name: `todo: ${t.text}` });
      expect(todoElement).toBeInTheDocument();
    });
  });
  it('Can add todo', async () => {
    const newTodoTextElem = screen.getByRole('textbox', { name: /New Todo Text/i });
    await userEvent.type(newTodoTextElem, newTodoText);
    
    const addTodoButtonElem = screen.getByRole('button', { name: /Add Todo/i });
    userEvent.click(addTodoButtonElem);

    const newTodoElement = screen.getByRole('listitem', { name: `todo: ${newTodoText}` });
    expect(newTodoElement).toBeInTheDocument();
  });
  it('Can complete/uncomplete todo', () => {
    const todoElement = screen.getByRole('listitem', { name: `todo: ${defaultTodos[0].text}` });

    expect(todoElement).toBeInTheDocument();

    const styleBeforeClick = window.getComputedStyle(todoElement);
    expect(styleBeforeClick.textDecoration).toMatch(/none/i);

    userEvent.click(todoElement);

    const styleAfterClick = window.getComputedStyle(todoElement);
    expect(styleAfterClick.textDecoration).toMatch(/line-through/i);

    userEvent.click(todoElement);

    const styleAfterReset = window.getComputedStyle(todoElement);
    expect(styleAfterReset.textDecoration).toMatch(/none/i);
  });
  it('Can display all/active/completed todos', () => {
    const firstTodoElement = screen.getByRole('listitem', { name: `todo: ${defaultTodos[0].text}` });
    expect(firstTodoElement).toBeInTheDocument();
    userEvent.click(firstTodoElement);

    const hasElement = (index: number, has: boolean) => {
      const elem = screen.queryByRole('listitem', { name: `todo: ${defaultTodos[index].text}` });
      if (has) {
        expect(elem).toBeInTheDocument();
      } else {
        expect(elem).not.toBeInTheDocument();
      }
    }
    const showCompletedTodos = screen.getByRole('button', { name: /Completed/i });
    expect(showCompletedTodos).toBeInTheDocument();
    const showActiveTodos = screen.getByRole('button', { name: /Active/i });
    expect(showActiveTodos).toBeInTheDocument();
    const showAllTodos = screen.getByRole('button', { name: /All/i });
    expect(showAllTodos).toBeInTheDocument();

    userEvent.click(showActiveTodos);

    hasElement(0, false);
    hasElement(1, true);

    userEvent.click(showCompletedTodos);

    hasElement(0, true);
    hasElement(1, false);

    userEvent.click(showAllTodos);

    hasElement(0, true);
    hasElement(1, true);
  });
});