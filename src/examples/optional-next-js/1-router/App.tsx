import React, { useState } from 'react';
import Link from '../../1-react-router/common/Link';
import window from './NodeSafeWindow';

export default function App() {
  const [counter, setCounter] = useState(0);
  const [pathname, setPathname] = useState(window.location.pathname);
  const updateLocation = (newLocation: string) => {
    setPathname(newLocation);
    window.history.pushState(null, '', newLocation);
  }
  window.addEventListener('popstate', () => {
    setPathname(window.location.pathname);
  })
  let innerComponent: JSX.Element;
  switch (pathname) {
    case '/':
      innerComponent = <Home />;
      break;
    case '/about':
      innerComponent =  <About />;
      break;
    case '/users':
      innerComponent =  <Users />;
      break;
    default:
      innerComponent = <div />;
      break;
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
            <Link
              to="/"
              updateLocation={updateLocation}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              updateLocation={updateLocation}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              updateLocation={updateLocation}
            >
              Users
            </Link>
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


