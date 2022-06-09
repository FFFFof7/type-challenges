import type { Equal, Expect } from '../test-utils'

type Mapping<T> = {
  [key in keyof T]: [T[key], T[key], T[key]]
}
type cases = [
  Expect<Equal<Mapping<{ a: 1; b: 2 }>, { a: [1, 1, 1]; b: [2, 2, 2] }>>,
  Expect<
    Equal<
      Mapping<{ c: string; d: never }>,
      { c: [string, string, string]; d: [never, never, never] }
    >
  >
]

type UppercaseKey<T> = {
  [key in keyof T as Uppercase<key & string>]: T[key]
}
type cases2 = [
  Expect<Equal<UppercaseKey<{ aa: 1; bb: 2 }>, { AA: 1; BB: 2 }>>,
  Expect<Equal<UppercaseKey<{ fan: 1; guang: 2 }>, { FAN: 1; GUANG: 2 }>>
]

type MyRecord<K extends string | number | symbol, T> = { [P in K]: T }
type cases3 = [
  Expect<Equal<MyRecord<'apple' | 'banana', 1>, { apple: 1; banana: 1 }>>
]

type MyReadOnly<T> = { readonly [P in keyof T]: T[P] }
type cases4 = [
  Expect<
    Equal<
      MyReadOnly<{ apple: 1; banana: 1 }>,
      { readonly apple: 1; readonly banana: 1 }
    >
  >
]

type MyPartial<T> = { [P in keyof T]?: T[P] }
type cases5 = [
  Expect<Equal<MyPartial<{ apple: 1; banana: 1 }>, { apple?: 1; banana?: 1 }>>
]

type MyMutable<T> = { -readonly [P in keyof T]: T[P] }
type cases6 = [
  Expect<
    Equal<
      MyMutable<{ readonly apple: 1; readonly banana: 1 }>,
      { apple: 1; banana: 1 }
    >
  >
]

type MyRequired<T> = { [P in keyof T]-?: T[P] }
type cases7 = [
  Expect<
    Equal<
      MyRequired<{ readonly apple?: 1; banana?: 1 }>,
      { readonly apple: 1; banana: 1 }
    >
  >
]

type FilterByValueType<T, V> = {
  [key in keyof T as T[key] extends V ? key : never]: T[key]
}
type cases8 = [
  Expect<
    Equal<
      FilterByValueType<{ a: 1; b: 2; c: '3'; d: true }, string | boolean>,
      { c: '3'; d: true }
    >
  >
]
