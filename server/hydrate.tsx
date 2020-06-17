// server/hydrate.tsx

import ReactDOM from 'react-dom';
import clientAppElement from '../src/examples/optional-next-js/5-hydration-safe-fetch/clientAppElement';

ReactDOM.hydrate(
  clientAppElement(),
  document.getElementById('root')
);