import type { Equal, Expect } from '../test-utils'

type StartsWith<T extends string, K extends string> = T extends `${K}${string}`
  ? true
  : false
type cases = [
  Expect<Equal<StartsWith<'abc', 'a'>, true>>,
  Expect<Equal<StartsWith<'abc', 'b'>, false>>
]

type Replace<
  T extends string,
  S extends string,
  R extends string
> = T extends `${infer P}${S}${infer Suffix}` ? `${P}${R}${Suffix}` : never

type cases2 = [
  Expect<Equal<Replace<'abc', 'a', '111'>, '111bc'>>,
  Expect<Equal<Replace<'abc', 'b', 'pp'>, 'appc'>>,
  Expect<Equal<Replace<'abcd', 'bc', 'pp1'>, 'app1d'>>,
  Expect<Equal<Replace<'abcd', 'abcd', 'pp1'>, 'pp1'>>
]

type emptyStr = ' ' | '\r' | '\t'
type TrimLeft<T> = T extends `${emptyStr}${infer Rest}` ? TrimLeft<Rest> : T

type cases3 = [
  Expect<Equal<TrimLeft<'   abc'>, 'abc'>>,
  Expect<Equal<TrimLeft<'   abc   '>, 'abc   '>>,
  Expect<Equal<TrimLeft<' abc'>, 'abc'>>,
  Expect<Equal<TrimLeft<' a  bc'>, 'a  bc'>>,
  Expect<Equal<TrimLeft<'abc'>, 'abc'>>
]

type TrimRight<T> = T extends `${infer Rest}${emptyStr}` ? TrimRight<Rest> : T
type test = TrimRight<'abc '>
type cases4 = [
  Expect<Equal<TrimRight<'abc  '>, 'abc'>>,
  Expect<Equal<TrimRight<'a bc   '>, 'a bc'>>,
  Expect<Equal<TrimRight<'   abc'>, '   abc'>>,
  Expect<Equal<TrimRight<'abc'>, 'abc'>>
]

type Trim<T> = TrimLeft<TrimRight<T>>
type cases5 = [
  Expect<Equal<Trim<'  abc  '>, 'abc'>>,
  Expect<Equal<Trim<'  a bc   '>, 'a bc'>>,
  Expect<Equal<Trim<'   abc'>, 'abc'>>,
  Expect<Equal<Trim<'abc  '>, 'abc'>>,
  Expect<Equal<Trim<'abc'>, 'abc'>>
]
