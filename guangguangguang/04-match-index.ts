import type { Equal, Expect } from '../test-utils'

type GetAProps<T> = T extends { a?: infer A | undefined } ? A : never
type cases = [Expect<Equal<GetAProps<{ a: 1; b: 2 }>, 1>>]
