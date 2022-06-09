import type { Equal, Expect } from '../test-utils'

type arr = [1, 2, 3, 4, 5]

type First<T> = T extends [infer F, ...unknown[]] ? F : never
type cases = [
  Expect<Equal<First<[1, 2, 3, 4]>, 1>>,
  Expect<Equal<First<['a', 1, 2]>, 'a'>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[any]>, any>>
]

type Last<T> = T extends [...unknown[], infer F] ? F : never
type cases2 = [
  Expect<Equal<Last<[1, 2, 3, 4]>, 4>>,
  Expect<Equal<Last<['a', 1, 2]>, 2>>,
  Expect<Equal<Last<[]>, never>>,
  Expect<Equal<Last<[any]>, any>>
]

type PopArr<T> = T extends []
  ? []
  : T extends [any, ...infer Rest]
  ? Rest
  : never
type cases3 = [
  Expect<Equal<PopArr<[1, 2, 3, 4]>, [2, 3, 4]>>,
  Expect<Equal<PopArr<['a', 1, 2]>, [1, 2]>>,
  Expect<Equal<PopArr<[]>, []>>,
  Expect<Equal<PopArr<[unknown]>, []>>
]

type ShiftArr<T> = T extends []
  ? []
  : T extends [...infer Rest, unknown]
  ? Rest
  : never
type cases4 = [
  Expect<Equal<ShiftArr<[1, 2, 3, 4]>, [1, 2, 3]>>,
  Expect<Equal<ShiftArr<['a', 1, 2]>, ['a', 1]>>,
  Expect<Equal<ShiftArr<[]>, []>>,
  Expect<Equal<ShiftArr<[any]>, []>>
]
