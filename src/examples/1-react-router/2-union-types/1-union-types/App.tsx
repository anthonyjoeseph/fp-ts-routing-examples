import React, {  useState } from 'react';
import PathnameLink from './PathnameLink';

export type Pathname = '/' | '/about' | '/users'

const componentFromPathname = (pathname: Pathname): JSX.Element => {
  switch(pathname) {
    case '/':
      return <Home />;
    case '/about':
      return  <About />;
    case '/users':
      return  <Users />;
    /* case 'somethingelse':
      return <Home />;
      break; */
    default:
      return <Home />;
  }
};

export default function App() {
  const [counter, setCounter] = useState(0);
  const [pathname, setPathname] = useState<Pathname>(window.location.pathname as Pathname);
  const updatePathname = (newurl: Pathname) => {
    setPathname(newurl);
    window.history.pushState(null, '', newurl);
  }
  window.addEventListener('popstate', () => {
    setPathname(window.location.pathname as Pathname);
  });
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
              updateLocation={updatePathname}
            >
              Home
            </PathnameLink>
          </li>
          <li>
            <PathnameLink
              to="/about"
              updateLocation={updatePathname}
            >
              About
            </PathnameLink>
          </li>
          <li>
            <PathnameLink
              to="/users"
              updateLocation={updatePathname}
            >
              Users
            </PathnameLink>
          </li>
        </ul>
      </nav>
        {componentFromPathname(pathname)}
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
