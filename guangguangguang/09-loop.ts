import type { Equal, Expect } from '../test-utils'
type DeepPromiseValueType<T> = T extends Promise<infer S>
  ? S extends Promise<any>
    ? DeepPromiseValueType<S>
    : S
  : never
type cases = [
  Expect<Equal<DeepPromiseValueType<Promise<string>>, string>>,
  Expect<
    Equal<DeepPromiseValueType<Promise<{ field: number }>>, { field: number }>
  >,
  Expect<
    Equal<
      DeepPromiseValueType<Promise<Promise<string | number>>>,
      string | number
    >
  >
]
