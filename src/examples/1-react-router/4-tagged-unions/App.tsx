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

export const parse = (pathname: string): Location => {
  if (pathname.startsWith('/topics')) {
    const remaining = pathname.replace('/topics', '')
    if (remaining === '' || remaining === '/') {
      return { type: 'Topics' }
    }
    if (remaining.charAt(0) === '/') {
      const topicID = remaining.slice(1)
      return {
        type: 'TopicsID',
        id: topicID,
      }
    }
    return {
      type: 'NotFound',
    }
  }
  switch (pathname) {
    case '/':
      return {
        type: 'Home',
      };
    case '/about':
      return  {
        type: 'About',
      };
    default:
      return {
        type: 'NotFound'
      };
  }
};

export const format = (location: Location): string => {
  switch (location.type) {
    case 'Home':
      return '/';
    case 'About':
      return '/about';
    case 'Topics':
      return  '/topics';
    case 'TopicsID':
      return `/topics/${location.id}`;
    case 'NotFound':
      return '';
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


