import type { Equal, Expect } from '../test-utils'

type AppendArgument<T, S> = T extends (...args: infer Arg) => infer R
  ? (...args: [...Arg, S]) => R
  : never
type cases = [
  Expect<
    Equal<
      AppendArgument<(a: string) => number, number>,
      (a: string, n: number) => number
    >
  >
]
