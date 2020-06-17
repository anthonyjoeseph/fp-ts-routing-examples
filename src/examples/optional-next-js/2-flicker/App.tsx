/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import window from '../1-router/NodeSafeWindow';

const App = ({
  initialUrl,
}: {
  initialUrl: string;
}) => {
  const [counter, setCounter] = useState(0);
  const [url, setUrl] = useState(initialUrl);
  const updateUrl = (newLocation: string) => {
    setUrl(newLocation);
    window.history.pushState(null, '', newLocation);
  }
  window.addEventListener('popstate', () => {
    setUrl(window.location.pathname);
  })
  let innerComponent: JSX.Element;
  switch (url) {
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
            <a
              onClick={() => updateUrl('/')}
            >
              Home
            </a>
          </li>
          <li>
            <a
              onClick={() => updateUrl('/about')}
            >
              About
            </a>
          </li>
          <li>
            <a
              onClick={() => updateUrl('/users')}
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
