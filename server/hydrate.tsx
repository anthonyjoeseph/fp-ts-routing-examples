// server/hydrate.tsx

import ReactDOM from 'react-dom';
import clientAppElement from '../src/examples/optional-next-js/3-async/clientAppElement';

ReactDOM.hydrate(
  clientAppElement(),
  document.getElementById('root')
);