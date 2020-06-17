/* eslint-disable jsx-a11y/anchor-is-valid */
import { ADTType } from '@morphic-ts/adt';
import { pipe } from 'fp-ts/lib/pipeable';
import * as O from 'fp-ts/lib/Option';
import { end, lit, str, } from 'fp-ts-routing';
import { routingFromMatches4 } from 'morphic-ts-routing';
import React, { useState } from 'react';

const {
  parse,
  format,
  adt: ParseableLocation
} = routingFromMatches4(
  ['Home', end],
  ['About', lit('about').then(end)],
  ['Topics', lit('topics').then(end)],
  ['TopicsID', lit('topics').then(str('id')).then(end)],
);
type ParseableLocation = ADTType<typeof ParseableLocation>

const Location = ParseableLocation.exclude(['NotFound'])
type Location = ADTType<typeof Location>

const HomeLocation = Location.select([
  'Home', 'About',
])
type HomeLocation = ADTType<typeof HomeLocation>

const TopicLocation = Location.select([
  'Topics','TopicsID',
])
type TopicLocation = ADTType<typeof TopicLocation>

const maybeHomeLocation = O.fromPredicate(
  (l: ParseableLocation): l is HomeLocation =>
    HomeLocation.verified(l as HomeLocation)
);

const maybeTopicLocation = O.fromPredicate(
  (l: ParseableLocation): l is TopicLocation =>
    TopicLocation.verified(l as TopicLocation)
);

const topicFromLocation = TopicLocation.match({
  Topics: () => <h3>Please select a topic.</h3>,
  TopicsID: (l) => <Topic topicId={l.value.id} />
});

const App = () => {
  const [location, setLocation] = useState<ParseableLocation>(parse(window.location.pathname));
  const updateLocation = (newLocation: Location) => {
    setLocation(newLocation);
    window.history.pushState(null, '', format(newLocation));
  }
  window.onpopstate = () => {
    setLocation(parse(window.location.pathname));
  }
  return (
    <div>
      <ul>
        <li>
          <a
            onClick={() => updateLocation(
              Location.of.Home({ value: {} })
            )}
          >
            Home
          </a>
        </li>
        <li>
          <a
            onClick={() => updateLocation(
              Location.of.About({ value: {} })
            )}
          >
            About
          </a>
        </li>
        <li>
          <a
            onClick={() => updateLocation(
              Location.of.Topics({ value: {} })
            )}
          >
            Topics
          </a>
        </li>
      </ul>
      {pipe(
        location,
        maybeHomeLocation,
        O.map(HomeLocation.match({
          Home: () => <Home />,
          About: () => <About />,
        })),
        O.alt(() => pipe(
          location,
          maybeTopicLocation,
          O.map(l => (
            <Topics
              location={l}
              setLocation={setLocation}
            />
          ))
        )),
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

function Topics({
  location,
  setLocation,
}: {
  location: TopicLocation,
  setLocation: (l: Location) => void,
}) {
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <a
            onClick={() => setLocation(
              TopicLocation.of.Topics({ value: { id: 'components' } })
            )}
          >
            Components
          </a>
        </li>
        <li>
          <a
            onClick={() => setLocation(
              TopicLocation.of.TopicsID({ value: { id: 'props-v-state' } })
            )}
          >
            Props v. State
          </a>
        </li>
      </ul>
      {topicFromLocation(location)}
    </div>
  );
}

function Topic({
  topicId,
}: {
  topicId: string
}) {
  return <h3>Requested topic ID: {topicId}</h3>;
}

export default App;
