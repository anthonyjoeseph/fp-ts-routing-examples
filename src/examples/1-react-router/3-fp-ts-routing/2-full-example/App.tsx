import { end, lit, str, Route, parse, format } from 'fp-ts-routing';
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

const home = end
const about = lit('about').then(end)
const topics = lit('topics').then(end)
const topicsID = lit('topics')
  .then(str('id'))
  .then(end)

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

export const parser = (s: string): Location => parse(
  router,
  Route.parse(s),
  { type: 'NotFound' },
)
export const formatter = (l: Location): string => {
  switch (l.type) {
    case 'Home':
      return format(home.formatter, l);
    case 'About':
      return format(about.formatter, l);
    case 'Topics':
      return format(topics.formatter, l);
    case 'TopicsID':
      return format(topicsID.formatter, l);
    case 'NotFound':
      return '/';
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
  const [location, setLocation] = useState<Location>(parser(window.location.pathname));
  const updateLocation = (newLocation: Location) => {
    setLocation(newLocation);
    window.history.pushState(null, '', formatter(newLocation));
  }
  window.addEventListener('popstate', () => {
    setLocation(parser(window.location.pathname));
  });
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
