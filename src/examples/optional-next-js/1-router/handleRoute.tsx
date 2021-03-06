import type { Request, Response } from 'express';
import type { ParamsDictionary } from 'express-serve-static-core';
import type QueryString from 'qs';
import React from 'react';
import generateClient from '../../../../server/GenerateClient';
import App from './App';

const handleRoute = async (
  req: Request<ParamsDictionary, unknown, unknown, QueryString.ParsedQs>,
  res: Response<string>,
) => {
  try {
    const clientString = await generateClient(
      <App />,
      undefined
    )
    return res.send(clientString);
  } catch (untypedErr) {
    const err: NodeJS.ErrnoException = untypedErr;
    console.error('Something went wrong:', err);
    return res.status(500).send('Oops, better luck next time!');
  }
};

export default handleRoute;