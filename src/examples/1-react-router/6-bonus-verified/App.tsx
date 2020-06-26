import { pipe } from 'fp-ts/lib/pipeable';
import * as O from 'fp-ts/lib/Option';
import { ADTType, makeADT, ofType } from '@morphic-ts/adt';
import * as R from 'fp-ts-routing';
import React, { useState } from 'react';
import LocationLink from '../6-morphic-ts/LocationLink';

const ParseableLocation = makeADT('type')({
  Home: ofType(),
  About: ofType(),
  Topics: ofType(),
  TopicsID: ofType<{ type: 'TopicsID'; id: string }>(),
  NotFound: ofType(),
});
type ParseableLocation = ADTType<typeof ParseableLocation>;

export const Location = ParseableLocation.exclude(['NotFound']);
export type Location = ADTType<typeof Location>;

const HomeLocation = Location.select([
  'Home', 'About',
])
type HomeLocation = ADTType<typeof HomeLocation>

const TopicLocation = Location.select(['Topics', 'TopicsID']);
type TopicLocation = ADTType<typeof TopicLocation>

const home = R.end;
const about = R.lit('about').then(R.end);
const topics = R.lit('topics').then(R.end);
const topicsID = R.lit('topics')
  .then(R.str('id'))
  .then(R.end);

const router = home.parser
  .map<ParseableLocation>(() => Location.of.Home({}))
  .alt(about.parser.map(() => Location.of.About({})))
  .alt(topics.parser.map(() => Location.of.Topics({})))
  .alt(topicsID.parser.map(({ id }) => Location.of.TopicsID({ id })));

export const parse = (s: string): ParseableLocation =>
  R.parse(router, R.Route.parse(s), { type: 'NotFound' });

export const format = ParseableLocation.matchStrict<string>({
  Home: l => R.format(home.formatter, l),
  About: l => R.format(about.formatter, l),
  Topics: l => R.format(topics.formatter, l),
  TopicsID: l => R.format(topicsID.formatter, l),
  NotFound: () => '/',
});

export default function App() {
  const [location, setLocation] = useState<ParseableLocation>(parse(window.location.pathname));
  const updateLocation = (newLocation: Location) => {
    setLocation(newLocation);
    window.history.pushState(null, '', format(newLocation));
  }
  window.addEventListener('popstate', () => {
    setLocation(parse(window.location.pathname));
  });
  return (
    <div>
      <ul>
        <li>
          <LocationLink
            to={Location.of.Home({})}
            updateLocation={updateLocation}
          >
            Home
          </LocationLink>
        </li>
        <li>
          <LocationLink
            to={Location.of.About({})}
            updateLocation={updateLocation}
          >
            About
          </LocationLink>
        </li>
        <li>
          <LocationLink
            to={Location.of.Topics({})}
            updateLocation={updateLocation}
          >
            Topics
          </LocationLink>
        </li>
      </ul>
      {pipe(
        location as HomeLocation,
        O.fromPredicate(HomeLocation.verified),
        O.map(HomeLocation.match({
          Home: () => <Home />,
          About: () => <About />,
        })),
        O.alt(() => pipe(
          location as TopicLocation,
          O.fromPredicate(TopicLocation.verified),
          O.map(l => (
            <Topics
              location={l}
              updateLocation={setLocation}
            />
          ))
        )),
        // Not Found
        O.getOrElse((): JSX.Element => <Home />),
      )}
    </div>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

const Topics = ({
  location,
  updateLocation,
}: {
  location: TopicLocation,
  updateLocation: (l: Location) => void,
}) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <LocationLink
          to={TopicLocation.of.TopicsID({ id: 'components' })}
          updateLocation={updateLocation}
        >
          Components
        </LocationLink>
      </li>
      <li>
        <LocationLink
          to={TopicLocation.of.TopicsID({ id: 'props-v-state' })}
          updateLocation={updateLocation}
        >
          Props v. State
        </LocationLink>
      </li>
    </ul>
    {TopicLocation.match({
      Topics: () => <h3>Please select a topic.</h3>,
      TopicsID: (l) => <Topic topicId={l.id} />
    })(location)}
  </div>
);

function Topic({
  topicId,
}: {
  topicId: string
}) {
  return <h3>Requested topic ID: {topicId}</h3>;
}

