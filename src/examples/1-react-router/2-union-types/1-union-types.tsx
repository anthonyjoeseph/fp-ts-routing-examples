/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {  useState } from 'react';

type Location = '/' | '/about' | '/users' | 'not-found'

const App = () => {
  const [counter, setCounter] = useState(0);
  const [location, setLocation] = useState<Location>(window.location.href as Location);
  const updateLocation = (newLocation: Location) => {
    setLocation(newLocation);
    window.history.pushState(null, '', newLocation);
  }
  window.onpopstate = () => {
    setLocation(window.location.href as Location);
  }
  let innerComponent: JSX.Element;
  switch (location) {
    case '/':
      innerComponent = <Home />;
      break;
    case '/about':
      innerComponent =  <About />;
      break;
    case '/users':
      innerComponent =  <Users />;
      break;
    case 'not-found':
      innerComponent= <div />;
      break;
    /* case 'somethingelse':
      innerComponent = <Home />
      break; */
  }
  return (
    <div>
      <button
        onClick={() => setCounter(counter + 1)}
      >
        inc: {counter}
      </button>
      <nav>
        <ul>
          <li>
            <a
              onClick={() => updateLocation('/')}
            >
              Home
            </a>
          </li>
          <li>
            <a
              onClick={() => updateLocation('/about')}
            >
              About
            </a>
          </li>
          <li>
            <a
              onClick={() => updateLocation('/users')}
            >
              Users
            </a>
          </li>
        </ul>
      </nav>
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

function Users() {
  return <h2>Users</h2>;
}

export default App;
