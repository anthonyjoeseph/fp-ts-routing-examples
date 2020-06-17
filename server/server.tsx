// server/server.tsx

import express from 'express';
import handleRoute from '../src/examples/optional-next-js/3-async/handleRoute';

const PORT = process.env.PORT || 3006;
const app = express();

app.use(express.static('./public', {
  index: false,
}));

app.use('/server-build', express.static('./server-build'));

app.get('*', handleRoute);

app.listen(PORT, () => {
  console.log(`😎 Server is listening on port ${PORT}`);
});