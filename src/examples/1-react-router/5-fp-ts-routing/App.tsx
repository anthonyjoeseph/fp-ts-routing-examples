import * as R from 'fp-ts-routing';
import React, { useState } from 'react';
import LocationLink from './LocationLink';

interface Home {
  readonly type: 'Home'
}

interface About {
  readonly type: 'About'
}

interface Topics {
  readonly type: 'Topics'
}

interface TopicsID {
  readonly type: 'TopicsID'
  readonly id: string
}

interface NotFound {
  readonly type: 'NotFound'
}

export type Location = Home | About | Topics
| TopicsID | NotFound

const home = R.end
const about = R.lit('about').then(R.end)
const topics = R.lit('topics').then(R.end)
const topicsID = R.lit('topics')
  .then(R.str('id'))
  .then(R.end)

const router = /*zero<Location>().alt*/home.parser.map<Location>(
    () => ({
      type: 'Home'
    })
  )
  .alt(about.parser.map(() => ({
    type: 'About'
  })))
  .alt(topics.parser.map(() => ({
    type: 'Topics'
  })))
  .alt(topicsID.parser.map(({ id }) => ({
    type: 'TopicsID',
    id,
  })))

export const parse = (s: string): Location => R.parse(
  router,
  R.Route.parse(s),
  { type: 'NotFound' },
)
export const format = (l: Location): string => {
  switch (l.type) {
    case 'Home':
      return R.format(home.formatter, l);
    case 'About':
      return R.format(about.formatter, l);
    case 'Topics':
      return R.format(topics.formatter, l);
    case 'TopicsID':
      return R.format(topicsID.formatter, l);
    case 'NotFound':
      return '/';
  }
}

export default function App() {
  const [location, setLocation] = useState<Location>(parse(window.location.pathname));
  const updateLocation = (newLocation: Location) => {
    setLocation(newLocation);
    window.history.pushState(null, '', format(newLocation));
  }
  window.addEventListener('popstate', () => {
    setLocation(parse(window.location.pathname));
  });
  let innerComponent: JSX.Element;
  switch (location.type) {
    case 'Home':
      innerComponent = <Home />;
      break;
    case 'About':
      innerComponent = <About />;
      break;
    case 'Topics':
      innerComponent = <Topics
        location={location}
        updateLocation={updateLocation}
      />;
      break;
    case 'TopicsID':
      innerComponent = <Topics
        location={location}
        updateLocation={updateLocation}
      />;
      break;
    case 'NotFound':
      innerComponent = <Home />
  }
  return (
    <div>
      <ul>
        <li>
          <LocationLink
            to={{
              type: 'Home'
            }}
            updateLocation={updateLocation}
          >
            Home
          </LocationLink>
        </li>
        <li>
          <LocationLink
            to={{
              type: 'About',
            }}
            updateLocation={updateLocation}
          >
            About
          </LocationLink>
        </li>
        <li>
          <LocationLink
            to={{
              type: 'Topics',
            }}
            updateLocation={updateLocation}
          >
            Topics
          </LocationLink>
        </li>
      </ul>
      {innerComponent}
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
  location: Topics | TopicsID,
  updateLocation: (l: Location) => void,
}) {
  let innerComponent: JSX.Element;
  switch (location.type) {
    case 'Topics':
      innerComponent = <h3>Please select a topic.</h3>;
      break;
    case 'TopicsID':
      innerComponent = <Topic topicId={location.id} />;
      break;
  }
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <LocationLink
            to={{ type: 'TopicsID', id: 'components' }}
            updateLocation={updateLocation}
          >
            Components
          </LocationLink>
        </li>
        <li>
          <LocationLink
            to={{ type: 'TopicsID', id: 'props-v-state' }}
            updateLocation={updateLocation}
          >
            Props v. State
          </LocationLink>
        </li>
      </ul>
      {innerComponent}
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
