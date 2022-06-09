import type { Equal, Expect } from '../test-utils'
type Push<T extends unknown[], R> = [...T, R]
type cases = [
  Expect<Equal<Push<[1, 2, 3, 4], 5>, [1, 2, 3, 4, 5]>>,
  Expect<Equal<Push<[1, 2, 3, 4], 'a'>, [1, 2, 3, 4, 'a']>>
]

type Unshift<T extends unknown[], R> = [R, ...T]
type cases2 = [
  Expect<Equal<Unshift<[1, 2, 3, 4], 5>, [5, 1, 2, 3, 4]>>,
  Expect<Equal<Unshift<[1, 2, 3, 4], 'a'>, ['a', 1, 2, 3, 4]>>
]

type Zip<T1, T2> = T1 extends [infer First1, ...infer Rest1]
  ? T2 extends [infer First2, ...infer Rest2]
    ? [[First1, First2], ...Zip<Rest1, Rest2>]
    : []
  : []

type cases3 = [
  Expect<
    Equal<
      Zip<[1, 2, 3, 4], ['a', 'b', 'c', 'd']>,
      [[1, 'a'], [2, 'b'], [3, 'c'], [4, 'd']]
    >
  >
]
