import { makeADT, ofType, ADTType } from "@morphic-ts/adt";
import { end, lit, str } from "fp-ts-routing"
import { routingFromMatches4 } from "morphic-ts-routing";

const {
  parse,
  format,
  adt: Location
} = routingFromMatches4(
  ['Home', end],
  ['About', lit('about').then(end)],
  ['Topics', lit('topics').then(end)],
  ['TopicsID', lit('topics').then(str('id')).then(end)],
);
type Location = ADTType<typeof Location>

const locations = [
  parse(''),
  parse('/'),
  parse('/home'),
  parse('home/'),
  parse('/users/123'),
  parse('/users/-44'),
  parse('/users/100.11'),
  parse('/users/'),
  parse('/users'),
]
locations.forEach(location => {
  console.log(`parsed location type: ${JSON.stringify(location)}`);
});

const urls = [
  format({ type: 'Home', value: {} }),
  format({ type: 'About', value: {} }),
  format({ type: 'Topics', value: {} }),
  format({ type: 'TopicsID', value: { id: 'someid' } }),
]
urls.forEach(urls => {
  console.log(`formatted url: ${urls}`);
});
