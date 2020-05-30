import React from 'react';

const App = () => {
  const url = window.location.href;
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
      <nav>
        <ul>
          <li>
            <a href='/'>Home</a>
          </li>
          <li>
            <a href='/about'>About</a>
          </li>
          <li>
            <a href='/users'>Users</a>
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
