import type { Equal, Expect } from '../test-utils'
type GetParameters<T> = T extends (...args: infer Args) => unknown
  ? Args
  : never
type cases = [
  Expect<
    Equal<GetParameters<(a: string, b: number) => string>, [string, number]>
  >,
  Expect<Equal<GetParameters<(p: 1 | 2) => 1 | 2>, [1 | 2]>>,
  Expect<Equal<GetParameters<(c: string) => void>, [string]>>
]

type GetReturnType<T> = T extends (...arg: unknown[]) => infer P ? P : never
type cases2 = [
  Expect<Equal<GetReturnType<() => string>, string>>,
  Expect<Equal<GetReturnType<() => 1 | 2>, 1 | 2>>,
  Expect<Equal<GetReturnType<() => void>, void>>
]

type GetThisParameterType<T> = T extends (
  this: infer ThisType,
  ...args: unknown[]
) => unknown
  ? ThisType
  : never

class Dong {
  name: string

  constructor() {
    this.name = 'dong'
  }

  hello(this: Dong) {
    return "hello, I'm " + this.name
  }
}
type cases3 = [Expect<Equal<GetThisParameterType<Dong['hello']>, Dong>>]

type GetInstanceType<T> = any

interface Person {
  name: string
}

interface PersonConstructor {
  new (name: string): Person
}
