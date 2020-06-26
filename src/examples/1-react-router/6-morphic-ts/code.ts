import { makeADT, ofType, ADTType } from '@morphic-ts/adt';
import * as R from 'fp-ts-routing';

const Location = makeADT('type')({
  Home: ofType(),
  About: ofType(),
  Topics: ofType(),
  TopicsID: ofType<{ type: 'TopicsID'; id: string }>(),
  NotFound: ofType(),
});
type Location = ADTType<typeof Location>;

const home = R.end;
const about = R.lit('about').then(R.end);
const topics = R.lit('topics').then(R.end);
const topicsID = R.lit('topics')
  .then(R.str('id'))
  .then(R.end);

const router = R.zero<Location>()
  .alt(
    home.parser.map<Location>(() => Location.of.Home({})),
  )
  .alt(about.parser.map(() => Location.of.About({})))
  .alt(topics.parser.map(() => Location.of.Topics({})))
  .alt(topicsID.parser.map(({ id }) => Location.of.TopicsID({ id })));

const parser = (s: string): Location =>
  R.parse(router, R.Route.parse(s), { type: 'NotFound' });

const formatter = Location.matchStrict<string>({
  Home: l => R.format(home.formatter, l),
  About: l => R.format(about.formatter, l),
  Topics: l => R.format(topics.formatter, l),
  TopicsID: l => R.format(topicsID.formatter, l),
  NotFound: () => '/',
});

const locations = [
  parser(''),
  parser('/'),
  parser('/home'),
  parser('home/'),
  parser('/users/components'),
  parser('/users/props-v-state'),
  parser('/users/two/'),
  parser('/users/'),
  parser('/users'),
];
locations.map(location => {
  console.log(`parsed location type: ${JSON.stringify(location)}`);
});

const urls = [
  formatter({ type: 'Home' }),
  formatter({ type: 'About' }),
  formatter({ type: 'Topics' }),
  formatter({ type: 'TopicsID', id: 'someid' }),
  formatter({ type: 'Home' }),
];
urls.map(urls => {
  console.log(`formatted url: ${urls}`);
});