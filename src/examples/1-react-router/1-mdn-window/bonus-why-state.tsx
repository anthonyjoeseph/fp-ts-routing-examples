/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {  useState } from 'react';

const App = () => {
  const [counter, setCounter] = useState(0);
  const [url, setUrl] = useState(window.location.href);
  const updateUrl = (newurl: string) => {
    setUrl(newurl);
    window.history.pushState(counter, '', newurl);
    // window.history.replaceState(counter, '', newurl);
  }
  window.onpopstate = (ev: PopStateEvent) => {
    setCounter(ev.state as number)
    setUrl(window.location.href);
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
