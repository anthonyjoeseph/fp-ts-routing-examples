import { ADTType } from '@morphic-ts/adt';
import * as R from 'fp-ts-routing';
import { routingFromMatches4 } from 'morphic-ts-routing';

const home = R.end;
const about = R.lit('about').then(R.end);
const topics = R.lit('topics').then(R.end);
const topicsID = R.lit('topics')
  .then(R.str('id'))
  .then(R.end);

const { parse, format, adt: Location } = routingFromMatches4(
  ['Home', home],
  ['About', about],
  ['Topics', topics],
  ['TopicsID', topicsID],
);
type Location = ADTType<typeof Location>;

const demo = Location.of.TopicsID({ value: { id: 'anything' } });

const urls = [
  format({ type: 'Home', value: {} }),
  format({ type: 'About', value: {} }),
  format({ type: 'Topics', value: {} }),
  format({ type: 'TopicsID', value: { id: 'someid' } }),
  format({ type: 'TopicsID', value: { id: "what's percent encoding?" } }),
  format({ type: 'NotFound' }),
];
urls.forEach(urls => {
  console.log(`formatted url: ${urls}`);
});

const locations = [
  parse(''),
  parse('/'),
  parse('/about'),
  parse('/abou'),
  parse('about'),
  parse('/about/extra/segments'),
  parse('/topics'),
  parse('/topics/anything'),
  parse("/topics/what's%20percent%20encoding%3F"),
];
locations.forEach(location => {
  console.log(`parsed location type: ${JSON.stringify(location)}`);
});


/* fs.writeFile(`src/RoutingFromMatches5.ts`, codegenWithNumRoutes(5), err => {
  // throws an error, you could also catch it here
  if (err) throw err;

  // success case, the file was saved
  console.log('RoutingFromMatches100.ts saved!');
}); */