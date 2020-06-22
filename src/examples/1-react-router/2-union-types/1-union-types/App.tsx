import React, {  useState } from 'react';
import PathnameLink from './PathnameLink';

export type Pathname = '/' | '/about' | '/users'

const App = () => {
  const [counter, setCounter] = useState(0);
  const [pathname, setPathname] = useState<Pathname>(window.location.pathname as Pathname);
  const updatePathname = (newurl: Pathname) => {
    setPathname(newurl);
    window.history.pushState(null, '', newurl);
  }
  window.addEventListener('popstate', () => {
    setPathname(window.location.pathname as Pathname);
  });
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
    /* case 'somethingelse':
      innerComponent = <Home />;
      break; */
    default:
      innerComponent = <Home />;
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
