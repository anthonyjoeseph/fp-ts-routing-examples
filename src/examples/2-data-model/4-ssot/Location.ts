import { end, lit } from 'fp-ts-routing';
import { routingFromMatches3 } from 'morphic-ts-routing';
import { ADTType } from '@morphic-ts/adt';
import { VisibilityFilter } from '../1-simple-todo/AppState';

export const {
  parse,
  format,
  adt: Location,
} = routingFromMatches3(
  ['Landing', end],
  ['Active', lit('active').then(end)],
  ['Completed', lit('completed').then(end)],
);
export type Location = ADTType<typeof Location>

export const routeToVisibilityFilter = Location.matchStrict<VisibilityFilter>({
  Landing: () => 'SHOW_ALL',
  Active: () => 'SHOW_ACTIVE',
  Completed: () => 'SHOW_COMPLETED',
  NotFound: () => 'SHOW_ALL',
})

export const visibilityFilterToRoute = (visibility: VisibilityFilter): Location => {
  switch (visibility) {
    case 'SHOW_ALL':
      return Location.of.Landing({ value: {} });
    case 'SHOW_ACTIVE':
      return Location.of.Active({ value: {} });
    case 'SHOW_COMPLETED':
      return Location.of.Completed({ value: {} });
  }
}
