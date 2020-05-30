const plus = (a: number, b: number) => a + b

const a = 1234.5678
const b = plus(28, a)
const c = Math.floor(b)
const d = String(c)
const e = Array.of(d)
export const output = Array.isArray(e)