import React, {  useState } from 'react';
import Link from '../../common/Link';

const App = () => {
  const [counter, setCounter] = useState(0);
  const [url, setUrl] = useState(window.location.pathname);
  const updateLocation = (newLocation: string) => {
    setUrl(newLocation);
    window.history.pushState(null, '', newLocation);
  }
  window.onpopstate = () => {
    setUrl(window.location.pathname);
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

export default App;
