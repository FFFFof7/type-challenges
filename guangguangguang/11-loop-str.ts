import type { Equal, Expect } from '../test-utils'
type ReplaceAll<
  Str extends string,
  Form extends string,
  To extends string
> = Str extends `${infer First}${Form}${infer Last}`
  ? `${First}${To}${ReplaceAll<Last, Form, To>}`
  : Str
type cases = [
  Expect<Equal<ReplaceAll<'aaaacc', 'aa', 'b'>, 'bbcc'>>,
  Expect<Equal<ReplaceAll<'aaaacc', 'a', ''>, 'cc'>>,
  Expect<Equal<ReplaceAll<'aaaacc', 'c', ''>, 'aaaa'>>,
  Expect<Equal<ReplaceAll<'dddd2222aaa22ddrr', '2', 'Z'>, 'ddddZZZZaaaZZddrr'>>
]

type StringToUnion<T> = T extends `${infer First}${infer Other}`
  ? First | StringToUnion<Other>
  : never
type cases2 = [
  Expect<Equal<StringToUnion<'fan'>, 'f' | 'a' | 'n'>>,
  Expect<Equal<StringToUnion<'guang'>, 'g' | 'u' | 'a' | 'n' | 'g'>>,
  Expect<Equal<StringToUnion<'f an'>, 'f' | ' ' | 'a' | 'n'>>
]

type ReverseStr<T> = T extends `${infer First}${infer Other}`
  ? `${ReverseStr<Other>}${First}`
  : T
type cases3 = [
  Expect<Equal<ReverseStr<'fan'>, 'naf'>>,
  Expect<Equal<ReverseStr<'guang'>, 'gnaug'>>,
  Expect<Equal<ReverseStr<'qwq'>, 'qwq'>>,
  Expect<Equal<ReverseStr<' 1'>, '1 '>>
]

type DeepReadonly<T> = {
  readonly [key in keyof T]: T[key] extends object
    ? T[key] extends Function
      ? T[key]
      : DeepReadonly<T[key]>
    : T[key]
}
type cases4 = [Expect<Equal<DeepReadonly<X>, Expected>>]

type X = {
  a: () => 22
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 'string'
        }
        k: 'hello'
      }
      l: [
        'hi',
        {
          m: ['hey']
        }
      ]
    }
  }
}

type Expected = {
  readonly a: () => 22
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 'string'
        }
        readonly k: 'hello'
      }
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        }
      ]
    }
  }
}
