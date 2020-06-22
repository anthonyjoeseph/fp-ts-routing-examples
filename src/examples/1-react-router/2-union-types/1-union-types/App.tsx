import React, {  useState } from 'react';
import Link from '../../common/Link';

type url = '/' | '/about' | '/users'

const App = () => {
  const [counter, setCounter] = useState(0);
  const [pathname, setPathname] = useState<url>(window.location.pathname as url);
  const updatePathname = (newurl: url) => {
    setPathname(newurl);
    window.history.pushState(null, '', newurl);
  }
  window.onpopstate = () => {
    setPathname(window.location.pathname as url);
  }
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
            <Link
              to="/"
              updateLocation={location => updatePathname(location as url)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              updateLocation={location => updatePathname(location as url)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              updateLocation={location => updatePathname(location as url)}
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
