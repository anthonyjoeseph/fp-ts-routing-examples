
/*const output = Array.isArray(
  Array.of(
    String(
      Math.floor(1234.5678)
    )
  )
)*/

/*const a = 1234.5678
const b = Math.floor(a)
const c = String(b)
const d = Array.of(c)
const output = Array.isArray(d)*/

/* const output = pipe(
  1234.5678,
  Math.floor,
  String,
  Array.of,
  Array.isArray,
); */

// import { pipe } from 'fp-ts/lib/pipeable'

const plus = (a: number, b: number) => a + b

/*const a = 1234.5678
const b = plus(28, a)
const c = Math.floor(b)
const d = String(c)
const e = Array.of(d)
const output = Array.isArray(e)*/

/*const output = pipe(
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

/* const output = pipe(
  1234.5678,
  curriedPlus(28),
  Math.floor,
  String,
  Array.of,
  Array.isArray
) */

/*const allOperations = (input: number) => pipe(
  input,
  curriedPlus(28),
  Math.floor,
  String,
  Array.of,
  Array.isArray
)
const output1 = allOperations(1234.5678);
const output2 = allOperations(8765.4321);*/

// import { flow } from 'fp-ts/lib/function'

/*const allOperations = flow(
  curriedPlus(28),
  Math.floor,
  String,
  Array.of,
  Array.isArray
)
const output1 = allOperations(1234.5678);
const output2 = allOperations(8765.4321);
*/


export const four =3;//{output, output1, output2};