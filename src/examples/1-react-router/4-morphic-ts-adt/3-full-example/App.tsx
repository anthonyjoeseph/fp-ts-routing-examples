import { ADTType, makeADT, ofType } from '@morphic-ts/adt';
import { end, lit, str, } from 'fp-ts-routing';
import { routingFromMatches4 } from 'morphic-ts-routing';
import React, { useState } from 'react';
import LocationLink from './LocationLink';

export const {
  parse,
  format,
  adt: Location
} = routingFromMatches4(
  ['Home', end],
  ['About', lit('about').then(end)],
  ['Topics', lit('topics').then(end)],
  ['TopicsID', lit('topics').then(str('id')).then(end)],
);
export type Location = ADTType<typeof Location>

const TopicLocation = makeADT('type')({
  Topics: ofType<{ type: 'Topics'; value: {} }>(),
  TopicsID: ofType<{ type: 'TopicsID'; value: { id: string } }>(),
});
type TopicLocation = ADTType<typeof TopicLocation>

export default function App() {
  const [location, setLocation] = useState<Location>(parse(window.location.pathname));
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
            to={Location.of.Home({ value: {} })}
            updateLocation={updateLocation}
          >
            Home
          </LocationLink>
        </li>
        <li>
          <LocationLink
            to={Location.of.About({ value: {} })}
            updateLocation={updateLocation}
          >
            About
          </LocationLink>
        </li>
        <li>
          <LocationLink
            to={Location.of.Topics({ value: {} })}
            updateLocation={updateLocation}
          >
            Topics
          </LocationLink>
        </li>
      </ul>
      {Location.matchStrict<JSX.Element>({
        Home: () => <Home />,
        About: () => <About />,
        Topics: (l) => <Topics
          location={l}
          updateLocation={updateLocation}
        />,
        TopicsID: (l) => <Topics
          location={l}
          updateLocation={updateLocation}
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
  updateLocation,
}: {
  location: TopicLocation,
  updateLocation: (l: Location) => void,
}) {
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <LocationLink
            to={TopicLocation.of.TopicsID({ value: { id: 'components' } })}
            updateLocation={updateLocation}
          >
            Components
          </LocationLink>
        </li>
        <li>
          <LocationLink
            to={TopicLocation.of.TopicsID({ value: { id: 'props-v-state' } })}
            updateLocation={updateLocation}
          >
            Props v. State
          </LocationLink>
        </li>
      </ul>
      {TopicLocation.match({
        Topics: () => <h3>Please select a topic.</h3>,
        TopicsID: (l) => <Topic topicId={l.value.id} />
      })(location)}
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

