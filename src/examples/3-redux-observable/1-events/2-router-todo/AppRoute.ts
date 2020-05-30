import { end, lit } from 'fp-ts-routing';
import { routingFromMatches3 } from 'morphic-ts-routing';
import { ADTType } from '@morphic-ts/adt';
import { TodoVisibility } from '../1-simple-todo/AppState';

export const {
  parse,
  format,
  adt: AppRoute,
} = routingFromMatches3(
  ['Landing', end],
  ['Active', lit('active').then(end)],
  ['Completed', lit('completed').then(end)],
);
export type AppRoute = ADTType<typeof AppRoute>

const routeToTodoVisibility = AppRoute.matchStrict<TodoVisibility>({
  Landing: () => 'SHOW_ALL',
  Active: () => 'SHOW_ACTIVE',
  Completed: () => 'SHOW_COMPLETED',
  NotFound: () => 'SHOW_ALL',
})
export const urlToTodoVisibility = (url: string) =>
  routeToTodoVisibility(parse(url));

const todoVisibilityToRoute = (visibility: TodoVisibility): AppRoute => {
  switch (visibility) {
    case 'SHOW_ALL':
      return AppRoute.of.Landing({ value: {} });
    case 'SHOW_ACTIVE':
      return AppRoute.of.Active({ value: {} });
    case 'SHOW_COMPLETED':
      return AppRoute.of.Completed({ value: {} });
  }
}
export const todoVisibilityToUrl = (visibility: TodoVisibility) =>
  format(todoVisibilityToRoute(visibility))
