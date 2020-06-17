import React from 'react';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import QueryString from 'qs';
import fetch from 'node-fetch';
import generateClient from '../../../../server/GenerateClient';
import App from './App';

const handleRoute = async (
  req: Request<ParamsDictionary, unknown, unknown, QueryString.ParsedQs>,
  res: Response<string>,
) => {
  try {
    const fetched = await fetch('https://reqres.in/api/users?page=2')
      .then(resp => resp.text())
      .then(text => `fetched: ${text}`);
    const clientString = await generateClient(
      <App
        initialUrl={req.url}
      />,
      fetched
    )
    return res.send(clientString);
  } catch (untypedErr) {
    const err: NodeJS.ErrnoException = untypedErr;
    console.error('Something went wrong:', err);
    return res.status(500).send('Oops, better luck next time!');
  }
};

export default handleRoute;