import { pipe } from 'fp-ts/lib/pipeable'

export const funcApplication = Array.isArray(
  Array.of(
    String(
      Math.floor(1234.5678)
    )
  )
)

const a = 1234.5678
const b = Math.floor(a)
const c = String(b)
const d = Array.of(c)
export const streamlined = Array.isArray(d)

export const piped = pipe(
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

export const curriedPipe = pipe(
  1234.5678,
  Math.floor,
  String,
  Array.of,
  Array.isArray,
);

const plus = (a: number, b: number) => a + b
/*
const a = 1234.5678
const b = plus(28, a)
const c = Math.floor(b)
const d = String(c)
const e = Array.of(d)
export const output = Array.isArray(e)
*/
/*
const output = pipe(
  1234.5678,
  plus(28, _),
  Math.floor,
  String,
  Array.of,
  Array.isArray
)*/

const curriedPlus = (a: number) => (b: number) => a + b
/*
const a = 1234.5678
const b = curriedPlus(28)(a)
const c = Math.floor(b)
const d = String(c)
const e = Array.of(d)
const output = Array.isArray(e)
*/
export const pipedOutput = pipe(
  1234.5678,
  curriedPlus(28),
  Math.floor,
  String,
  Array.of,
  Array.isArray
)
