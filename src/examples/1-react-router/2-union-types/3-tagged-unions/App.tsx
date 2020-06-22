import React, { useState } from 'react';
import FormattedLink from './FormattedLink';

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

type TopicLocation = Topics | TopicsID

export const parse = (unparsed: string): Location => {
  if (unparsed.startsWith('/topics')) {
    const remaining = unparsed.replace('/topics', '')
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
  switch (unparsed) {
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

export const format = (parsed: Location): string => {
  switch (parsed.type) {
    case 'Home':
      return '/';
    case 'About':
      return '/about';
    case 'Topics':
      return  '/topics';
    case 'TopicsID':
      return `/topics/${parsed.id}`;
    case 'NotFound':
      return '';
  }
}


const componentFromLocation = (
  location: Location,
  updateLocation: (l: Location) => void,
): JSX.Element => {
  switch (location.type) {
    case 'Home':
      return <Home />;
    case 'About':
      return  <About />;
    case 'Topics':
      return  <Topics
        location={location}
        updateLocation={updateLocation}
      />;
    case 'TopicsID':
      return <Topics
        location={location}
        updateLocation={updateLocation}
      />;
    case 'NotFound':
      return <div />
  }
}

const topicFromLocation = (location: TopicLocation): JSX.Element => {
  switch (location.type) {
    case 'Topics':
      return <h3>Please select a topic.</h3>
    case 'TopicsID':
      return <Topic topicId={location.id} />
  }
};

const App = () => {
  const [location, setLocation] = useState<Location>(parse(window.location.pathname));
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
          <FormattedLink
            to={{
              type: 'Home'
            }}
            updateLocation={updateLocation}
          >
            Home
          </FormattedLink>
        </li>
        <li>
          <FormattedLink
            to={{
              type: 'About',
            }}
            updateLocation={updateLocation}
          >
            About
          </FormattedLink>
        </li>
        <li>
          <FormattedLink
            to={{
              type: 'Topics',
            }}
            updateLocation={updateLocation}
          >
            Users
          </FormattedLink>
        </li>
      </ul>
      {componentFromLocation(location, setLocation)}
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
          <FormattedLink
            to={{ type: 'TopicsID', id: 'components' }}
            updateLocation={updateLocation}
          >
            Components
          </FormattedLink>
        </li>
        <li>
          <FormattedLink
            to={{ type: 'TopicsID', id: 'props-v-state' }}
            updateLocation={updateLocation}
          >
            Props v. State
          </FormattedLink>
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
