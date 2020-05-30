import { pipe } from 'fp-ts/lib/pipeable'

/*
const plus = (a: number, b: number) => a + b
const output = pipe(
  1234.5678,
  plus(28, _),
  Math.floor,
  String,
  Array.of,
  Array.isArray
)*/

const curriedPlus = (a: number) => (b: number) => a + b

const a = 1234.5678
const b = curriedPlus(28)(a)
const c = Math.floor(b)
const d = String(c)
const e = Array.of(d)
const output = Array.isArray(e)

export const pipedOutput = pipe(
  1234.5678,
  curriedPlus(28),
  Math.floor,
  String,
  Array.of,
  Array.isArray
)