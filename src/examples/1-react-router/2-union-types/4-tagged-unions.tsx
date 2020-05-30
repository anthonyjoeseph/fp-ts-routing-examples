/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

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

type Location = Home | About | Topics
| TopicsID | NotFound

type TopicLocation = Topics | TopicsID

const parse = (unparsed: string): Location => {
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

const format = (parsed: Location): string => {
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
  setLocation: (l: Location) => void,
): JSX.Element => {
  switch (location.type) {
    case 'Home':
      return <Home />;
    case 'About':
      return  <About />;
    case 'Topics':
      return  <Topics
        location={location}
        setLocation={setLocation}
      />;
    case 'TopicsID':
      return <Topics
        location={location}
        setLocation={setLocation}
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
  const [location, setLocation] = useState<Location>(parse(window.location.href));
  const updateLocation = (newLocation: Location) => {
    setLocation(newLocation);
    window.history.pushState(null, '', format(newLocation));
  }
  window.onpopstate = () => {
    setLocation(parse(window.location.href));
  }
  return (
    <div>
      <ul>
        <li>
          <a
            onClick={() => updateLocation({
              type: 'Home'
            })}
          >
            Home
          </a>
        </li>
        <li>
          <a
            onClick={() => updateLocation({
              type: 'About',
            })}
          >
            About
          </a>
        </li>
        <li>
          <a
            onClick={() => updateLocation({
              type: 'Topics',
            })}
          >
            Users
          </a>
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
            onClick={() => setLocation({ type: 'TopicsID', id: 'components' })}
          >
            Components
          </a>
        </li>
        <li>
          <a
            onClick={() => setLocation({ type: 'TopicsID', id: 'props-v-state' })}
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
