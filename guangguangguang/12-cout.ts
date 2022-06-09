import type { Equal, Expect } from '../test-utils'

type BuildArrByLen<T, F = 0, R extends any[] = []> = R['length'] extends T
  ? R
  : BuildArrByLen<T, F, [F, ...R]>
type cases = [
  Expect<Equal<BuildArrByLen<1, 0>, [0]>>,
  Expect<Equal<BuildArrByLen<1, 'a'>, ['a']>>,
  Expect<Equal<BuildArrByLen<5>, [0, 0, 0, 0, 0]>>
]

type Add<T1, T2> = [...BuildArrByLen<T1>, ...BuildArrByLen<T2>]['length']
type cases2 = [
  Expect<Equal<Add<1, 1>, 2>>,
  Expect<Equal<Add<1, 0>, 1>>,
  Expect<Equal<Add<5, 2>, 7>>
]

type Subtract<T1, T2> = BuildArrByLen<T1> extends [
  ...BuildArrByLen<T2>,
  ...infer Rest
]
  ? Rest['length']
  : never
type cases3 = [
  Expect<Equal<Subtract<1, 1>, 0>>,
  Expect<Equal<Subtract<1, 0>, 1>>,
  Expect<Equal<Subtract<5, 2>, 3>>
]

type Multiply<T1, T2, R extends unknown[] = []> = T2 extends 0
  ? R['length']
  : Multiply<T1, Subtract<T2, 1>, [...BuildArrByLen<T1>, ...R]>
type cases4 = [
  Expect<Equal<Multiply<1, 1>, 1>>,
  Expect<Equal<Multiply<1, 0>, 0>>,
  Expect<Equal<Multiply<0, 1>, 0>>,
  Expect<Equal<Multiply<5, 2>, 10>>
]

type Divide<T1, T2, R = 0> = T1 extends 0
  ? R
  : Divide<Subtract<T1, T2>, T2, Add<R, 1>>
type cases5 = [
  Expect<Equal<Divide<1, 1>, 1>>,
  Expect<Equal<Divide<10, 2>, 5>>,
  Expect<Equal<Divide<0, 1>, 0>>,
  Expect<Equal<Divide<4, 2>, 2>>
]

type StrLen<T, R = 0> = T extends `${string}${infer Rest}`
  ? StrLen<Rest, Add<R, 1>>
  : R
type cases6 = [
  Expect<Equal<StrLen<'abc'>, 3>>,
  Expect<Equal<StrLen<'fan'>, 3>>,
  Expect<Equal<StrLen<'guang'>, 5>>,
  Expect<Equal<StrLen<''>, 0>>
]

type GreaterThan<T1, T2, R extends unknown[] = []> = T1 extends R['length']
  ? false
  : T2 extends R['length']
  ? true
  : GreaterThan<T1, T2, [unknown, ...R]>

type cases7 = [
  Expect<Equal<GreaterThan<1, 1>, false>>,
  Expect<Equal<GreaterThan<10, 2>, true>>,
  Expect<Equal<GreaterThan<0, 1>, false>>,
  Expect<Equal<GreaterThan<4, 2>, true>>,
  Expect<Equal<GreaterThan<7, 9>, false>>
]

type Fibonacci<T> = T extends 0
  ? 0
  : T extends 1
  ? 1
  : Add<Fibonacci<Subtract<T, 1>>, Fibonacci<Subtract<T, 2>>>

type cases8 = [
  Expect<Equal<Fibonacci<0>, 0>>,
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<4>, 3>>,
  Expect<Equal<Fibonacci<5>, 5>>,
  Expect<Equal<Fibonacci<6>, 8>>,
  Expect<Equal<Fibonacci<7>, 13>>,
  Expect<Equal<Fibonacci<8>, 21>>,
  Expect<Equal<Fibonacci<9>, 34>>
]
