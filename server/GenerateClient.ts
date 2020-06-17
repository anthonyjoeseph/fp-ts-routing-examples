import serialize from 'serialize-javascript';
import path from 'path';
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

export default <P>(
  App: React.ReactElement<P>,
  globalState: string | undefined,
): Promise<string> => new Promise((resolve, reject) => {
  const app = ReactDOMServer.renderToString(App);

  const indexFile = path.resolve('./server/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      reject(err);
    }
    const clientString = data
    .replace(
      '<div id="root"></div>', 
      `<div id="root">${app}</div>`,
    )
    .replace(
      '<head>',
      `<head><script>window.__INITIAL__DATA__ = ${serialize(globalState)}</script>`,
    );
    resolve(clientString);
  });
})