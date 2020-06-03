import serialize from 'serialize-javascript';
import path from 'path';
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

export default (
  App: string | React.FunctionComponent | React.ComponentClass,
  globalState: string | object | undefined,
): Promise<string> => new Promise((resolve, reject) => {
  const app = ReactDOMServer.renderToString(React.createElement(App));

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
