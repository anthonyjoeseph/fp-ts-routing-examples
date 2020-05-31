import { end, lit } from 'fp-ts-routing';
import { routingFromMatches3 } from 'morphic-ts-routing';
import { ADTType } from '@morphic-ts/adt';

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