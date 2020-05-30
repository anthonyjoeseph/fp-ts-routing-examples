import { pipe } from 'fp-ts/lib/pipeable';
import { flow } from 'fp-ts/lib/function';

const plus = (a: number, b: number) => a + b
const curriedPlus = (a: number) => (b: number) => a + b

const allOps = (input: number) => pipe(
  input,
  curriedPlus(28),
  Math.floor,
  String,
  Array.of,
  Array.isArray
)
export const output1 = allOps(1234.5678);
export const output2 = allOps(8765.4321);

export const allOpsFlow = flow(
  curriedPlus(28),
  Math.floor,
  String,
  Array.of,
  Array.isArray
)
export const flowOutput1 = allOpsFlow(1234.5678);
export const flowOutput2 = allOpsFlow(8765.4321);

export const multiparam = flow(
  plus,
  Math.floor,
  String,
  Array.of,
  Array.isArray
)
export const multiparamOutput1 = multiparam(28, 1234.5678);
export const multiparamOutput2 = multiparam(42, 8765.4321);