/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {  useState } from 'react';

type url = '/' | '/about' | '/users' | 'not-found'

const App = () => {
  const [counter, setCounter] = useState(0);
  const [url, setUrl] = useState<url>(window.location.pathname as url);
  const updateUrl = (newurl: url) => {
    setUrl(newurl);
    window.history.pushState(null, '', newurl);
  }
  window.onpopstate = () => {
    setUrl(window.location.pathname as url);
  }
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
