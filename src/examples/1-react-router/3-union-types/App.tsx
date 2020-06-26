import React, {  useState } from 'react';
import PathnameLink from './PathnameLink';

export type Pathname = '/' | '/about' | '/users'

export default function App() {
  const [counter, setCounter] = useState(0);
  const [pathname, setPathname] = useState<string>(window.location.pathname);
  const updatePathname = (newurl: string) => {
    setPathname(newurl);
    window.history.pushState(null, '', newurl);
  }
  window.addEventListener('popstate', () => {
    setPathname(window.location.pathname);
  });
  let innerComponent: JSX.Element;
  switch(pathname as Pathname) {
    case '/':
      innerComponent = <Home />;
      break;
    case '/about':
      innerComponent = <About />;
      break;
    case '/users':
      innerComponent = <Users />;
      break;
    default:
      innerComponent = <Home />;
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
            <PathnameLink
              to="/"
              updatePathname={updatePathname}
            >
              Home
            </PathnameLink>
          </li>
          <li>
            <PathnameLink
              to="/about"
              updatePathname={updatePathname}
            >
              About
            </PathnameLink>
          </li>
          <li>
            <PathnameLink
              to="/users"
              updatePathname={updatePathname}
            >
              Users
            </PathnameLink>
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
