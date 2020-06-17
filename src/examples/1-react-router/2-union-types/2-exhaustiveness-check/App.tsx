/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {  useState } from 'react';
import Link from '../../common/Link';

type Location = '/' | '/about' | '/users'

const componentFromLocation = (
  location: Location
): JSX.Element => {
  switch (location) {
    case '/':
      return <Home />;
    case '/about':
      return  <About />;
    case '/users':
      return  <Users />;
/*  case 'somethingelse':
      return <Home /> */
  }
}

const App = () => {
  const [counter, setCounter] = useState(0);
  const [location, setLocation] = useState<Location>(window.location.pathname as Location);
  const updateLocation = (newLocation: Location) => {
    setLocation(newLocation);
    window.history.pushState(null, '', newLocation);
  }
  window.onpopstate = () => {
    setLocation(window.location.pathname as Location);
  }
  const innerComponent: JSX.Element = componentFromLocation(location);
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
              updateLocation={location => updateLocation(location as Location)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              updateLocation={location => updateLocation(location as Location)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              updateLocation={location => updateLocation(location as Location)}
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
