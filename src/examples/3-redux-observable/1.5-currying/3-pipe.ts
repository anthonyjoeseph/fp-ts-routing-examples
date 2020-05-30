import { pipe } from 'fp-ts/lib/pipeable'

export const output = pipe(
  1234.5678,
  a => Math.floor(a),
  b => String(b),
  c => Array.of(c),
  d => Array.isArray(d),
);

export const trysomething = pipe(
  1234.5678,
  a => {
    const justFunc = Math.floor
    const retval = justFunc(a)
    return retval;
  },
  b => String(b),
  c => Array.of(c),
  d => Array.isArray(d),
);

export const curriedOutput = pipe(
  1234.5678,
  Math.floor,
  String,
  Array.of,
  Array.isArray,
);