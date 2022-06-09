import type { Equal, Expect } from '../test-utils'
type ReverseArr<T> = T extends [infer F, ...infer Rest]
  ? [...ReverseArr<Rest>, F]
  : T

type cases = [
  Expect<Equal<ReverseArr<[1, 2, 3]>, [3, 2, 1]>>,
  Expect<Equal<ReverseArr<['a']>, ['a']>>
]

type Includes<T, S> = T extends [infer F, ...infer Rest]
  ? Equal<S, F> extends true
    ? true
    : Includes<Rest, S>
  : false
type cases2 = [
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<['a', any], any>, true>>,
  Expect<Equal<Includes<['a', 1], any>, false>>,
  Expect<Equal<Includes<['a', 1, any], true>, false>>
]

type RemoveItem<T, S> = T extends [infer F, ...infer Rest]
  ? Equal<F, S> extends true
    ? RemoveItem<Rest, S>
    : [F, ...RemoveItem<Rest, S>]
  : T
type cases3 = [
  Expect<Equal<RemoveItem<[1, 2, 3], 1>, [2, 3]>>,
  Expect<Equal<RemoveItem<[1, 1, 3], 1>, [3]>>,
  Expect<Equal<RemoveItem<[1, 1, any, any, any], 1>, [any, any, any]>>
]

type BuildArray<
  Length,
  Type,
  Result extends any[] = []
> = Result['length'] extends Length
  ? Result
  : BuildArray<Length, Type, [...Result, Type]>
type cases4 = [
  Expect<Equal<BuildArray<4, any>, [any, any, any, any]>>,
  Expect<Equal<BuildArray<3, string>, [string, string, string]>>
]
