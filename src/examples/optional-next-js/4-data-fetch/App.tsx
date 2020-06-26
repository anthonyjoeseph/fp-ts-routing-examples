import React, { useState } from 'react';
import Link from '../../1-react-router/common/Link';
import window from '../1-router/NodeSafeWindow';

export default function App({
  initialUrl,
  fetched,
}: {
  initialUrl: string;
  fetched: string;
}) {
  const [counter, setCounter] = useState(0);
  const [pathname, setPathname] = useState(initialUrl);
  const updatePathname = (newLocation: string) => {
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
      {fetched}
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
              updatePathname={updatePathname}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              updatePathname={updatePathname}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              updatePathname={updatePathname}
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


