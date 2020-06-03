import fetch from 'node-fetch';
import express from 'express';

import App from '../src/examples/2-data-model/1-simple-todo/App';
import generateClient from './GenerateClient';

const PORT = process.env.PORT || 3006;
const app = express();

app.use(express.static('./build', {
  index: false,
}));

app.use('/server-build/hydrate.js', express.static('./server-build/hydrate.js'));

app.get('*', async (req, res) => {
  const globalState = req.url?.includes('nofetch')
    ? "no fetch"
    : await fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(resp => resp.text())
        .then(text => `fetched: ${text}`);
  try {
    const clientString = await generateClient(App, globalState)
    return res.send(clientString);
  } catch (untypedErr) {
    const err: NodeJS.ErrnoException = untypedErr;
    console.error('Something went wrong:', err);
    return res.status(500).send('Oops, better luck next time!');
  }
});

app.listen(PORT, () => {
  console.log(`😎 Server is listening on port ${PORT}`);
});