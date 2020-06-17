/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { end, lit, str, } from 'fp-ts-routing';
import { routingFromMatches4 } from 'morphic-ts-routing';
import { ADTType } from '@morphic-ts/adt';

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

const TopicLocation = Location.select([
  'Topics', 'TopicsID',
]);
type TopicLocation = ADTType<typeof TopicLocation>

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
      {ParseableLocation.matchStrict<JSX.Element>({
        Home: () => <Home />,
        About: () => <About />,
        Topics: (l) => <Topics
          location={l}
          setLocation={setLocation}
        />,
        TopicsID: (l) => <Topics
          location={l}
          setLocation={setLocation}
        />,
        NotFound: () => <div />,
      })(location)}
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
