import React, {  useState } from 'react';
import Link from '../../common/Link';

export default function App() {
  const [counter, setCounter] = useState(0);
  const [pathname, setPathname] = useState(window.location.pathname);
  const updatePathname = (newPathname: string) => {
    setPathname(newPathname);
    window.history.pushState(null, '', newPathname);
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
            <Link
              to="/"
              updateLocation={updatePathname}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              updateLocation={updatePathname}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              updateLocation={updatePathname}
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


