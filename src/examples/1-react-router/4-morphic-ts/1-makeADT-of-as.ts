import { makeADT, ofType, ADTType } from "@morphic-ts/adt";
import { end, lit, int, parse, format, Route, str, zero } from "fp-ts-routing"

const Location = makeADT('type')({
  Home: ofType(),
  About: ofType(),
  Topics: ofType(),
  TopicsID: ofType<{ type: 'TopicsID'; id: string }>(),
  NotFound: ofType(),
});
type Location = ADTType<typeof Location>

const home = end
const about = lit('about').then(end)
const topics = lit('topics').then(end)
const topicsID = lit('topics')
  .then(str('id'))
  .then(end)

const router = zero<Location>()
  .alt(home.parser.map<Location>(
    () => Location.of.Home({}),
  ))
  .alt(about.parser.map(
    () => Location.of.About({})
  ))
  .alt(topics.parser.map(
    () => Location.of.Topics({})
  ))
  .alt(topicsID.parser.map(
    ({ id }) => Location.of.TopicsID({ id })
  ))

const parser = (s: string): Location => parse(
  router,
  Route.parse(s),
  { type: 'NotFound' },
)

const formatter = (l: Location) => Location.matchStrict<string>({
  Home: (l) => format(home.formatter, l),
  About: (l) => format(about.formatter, l),
  Topics: (l) => format(topics.formatter, l),
  TopicsID: (l) => format(topicsID.formatter, l),
  NotFound: () => '/'
})(l)

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
]
locations.map(location => {
  console.log(`parsed location type: ${JSON.stringify(location)}`);
});

const urls = [
  formatter({ type: 'Home' }),
  formatter({ type: 'About' }),
  formatter({ type: 'Topics' }),
  formatter({ type: 'TopicsID', id: 'someid' }),
  formatter({ type: 'Home' }),
]
urls.map(urls => {
  console.log(`formatted url: ${urls}`);
});

export const four = 3;