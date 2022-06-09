import type { Equal, Expect } from '../test-utils'
type MergeValue<T1, T2> = T1 extends T2
  ? T1
  : T2 extends any[]
  ? [T1, ...T2]
  : [T1, T2]
type MergeParam<
  T1 extends Record<string, any>,
  T2 extends Record<string, any>
> = {
  [key in keyof T1 | keyof T2]: key extends keyof T1
    ? key extends keyof T2
      ? MergeValue<T1[key], T2[key]>
      : T1[key]
    : key extends keyof T2
    ? T2[key]
    : never
}

type ParseParam<T> = T extends `${infer Key}=${infer Value}`
  ? {
      [K in Key]: Value
    }
  : {}
type ParseQueryString<T extends string> =
  T extends `${infer Param}&${infer Rest}`
    ? MergeParam<ParseParam<Param>, ParseQueryString<Rest>>
    : ParseParam<T>

type cases = [
  Expect<Equal<ParseQueryString<'a=1&b=2&c=3'>, { a: '1'; b: '2'; c: '3' }>>,
  Expect<
    Equal<ParseQueryString<'a=1&b=2&c=3&a=1'>, { a: '1'; b: '2'; c: '3' }>
  >,
  Expect<
    Equal<
      ParseQueryString<'a=1&b=2&c=3&a=2'>,
      { a: ['1', '2']; b: '2'; c: '3' }
    >
  >
]

type CurriedFunc<P, R> = P extends [infer Arg, ...infer Rest]
  ? (arg: Arg) => CurriedFunc<Rest, R>
  : R
type Currying<T> = T extends (...args: infer P) => infer R
  ? CurriedFunc<P, R>
  : never
type cases2 = [
  Expect<
    Equal<
      Currying<(a: number, b: string) => void>,
      (arg: number) => (arg: string) => void
    >
  >,
  Expect<
    Equal<
      Currying<(a: number, b: string, c: boolean) => void>,
      (arg: number) => (arg: string) => (arg: boolean) => void
    >
  >,
  Expect<Equal<Currying<() => void>, void>>
]
