import * as assert from 'assert';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import MockableApp from './MockableApp';
import { format, Location } from '../4-ssot/Location';

test('New filters change the url', () => {
  let allPushedLocations: string[] = [];

  render(
    <MockableApp
      pushUrl={(url) => {
        allPushedLocations.push(url)
      }}
    />
  );

  const showCompletedTodos = screen.getByText(/Completed/i);
  expect(showCompletedTodos).toBeInTheDocument();
  const showActiveTodos = screen.getByText(/Active/i);
  expect(showActiveTodos).toBeInTheDocument();
  const showAllTodos = screen.getByText(/All/i);
  expect(showAllTodos).toBeInTheDocument();

  fireEvent.click(showCompletedTodos);
  fireEvent.click(showActiveTodos);
  fireEvent.click(showAllTodos);

  assert.deepStrictEqual(
    allPushedLocations,
    [
      format(
        Location.of.Completed({ value: {} })
      ),
      format(
        Location.of.Active({ value: {} })
      ),
      format(
        Location.of.Landing({ value: {} })
      )
    ]
  );

});