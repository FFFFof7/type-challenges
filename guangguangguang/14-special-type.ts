import type { Equal, Expect } from '../test-utils'

type isAny<T> = 'a' extends T & 'b' ? true : false
type cases = [
  Expect<Equal<isAny<1>, false>>,
  Expect<Equal<isAny<any>, true>>,
  Expect<Equal<isAny<never>, false>>,
  Expect<Equal<isAny<'a'>, false>>,
  Expect<Equal<isAny<'b'>, false>>,
  Expect<Equal<isAny<1 | any>, true>>
]

type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never
type cases2 = [
  Expect<Equal<IsUnion<'a' | 'b' | 'c'>, true>>,
  Expect<Equal<IsUnion<1 | 2 | 3>, true>>,
  Expect<Equal<IsUnion<1>, false>>,
  Expect<Equal<IsUnion<any>, false>>
]

type IsNever<T> = [T] extends [never] ? true : false
type cases3 = [
  Expect<Equal<IsNever<never>, true>>,
  Expect<Equal<IsNever<1>, false>>,
  Expect<Equal<IsNever<any>, false>>
]

type IsTuple<T> = T extends [...infer Arr]
  ? Equal<Arr['length'], number> extends true
    ? false
    : true
  : false
type cases4 = [
  Expect<Equal<IsTuple<[1, 2, 3, 4]>, true>>,
  Expect<Equal<IsTuple<any>, false>>,
  Expect<Equal<IsTuple<string>, false>>,
  Expect<Equal<IsTuple<number[]>, false>>
]

type UnionToIntersection<U> = (
  U extends U ? (x: U) => unknown : never
) extends (x: infer R) => unknown
  ? R
  : never
type cases5 = [
  Expect<Equal<UnionToIntersection<string[] | ['b']>, string[] & ['b']>>,
  Expect<Equal<UnionToIntersection<number[] | [1]>, number[] & [1]>>,
  Expect<Equal<UnionToIntersection<string | 2>, never>>
]

type GetOptional<T> = {
  [key in keyof T as {} extends Pick<T, key> ? key : never]: T[key]
}

type cases6 = [
  Expect<Equal<GetOptional<{ a: 1; b?: 2 }>, { b?: 2 }>>,
  Expect<Equal<GetOptional<{ a: 1; b?: 2; c?: 3 }>, { b?: 2; c?: 3 }>>,
  Expect<Equal<GetOptional<{}>, {}>>,
  Expect<Equal<GetOptional<{ a: 1 }>, {}>>,
  Expect<Equal<GetOptional<{ a?: 1; b?: 2 }>, { a?: 1; b?: 2 }>>
]

type GetRequired<T> = {
  [key in keyof T as {} extends Pick<T, key> ? never : key]: T[key]
}
type cases7 = [
  Expect<Equal<GetRequired<{ a: 1; b?: 2 }>, { a: 1 }>>,
  Expect<Equal<GetRequired<{ a: 1; b?: 2; c: 3 }>, { a: 1; c: 3 }>>,
  Expect<Equal<GetRequired<{ a: 1; b: 2 }>, { a: 1; b: 2 }>>,
  Expect<Equal<GetRequired<{ a?: 1; b?: 2 }>, {}>>,
  Expect<Equal<GetRequired<{}>, {}>>
]

type RemoveIndexSignature<T> = {
  [key in keyof T as key extends `${infer S}` ? key : never]: T[key]
}
type cases8 = [
  Expect<Equal<RemoveIndexSignature<{ [key: string]: any }>, {}>>,
  Expect<Equal<RemoveIndexSignature<{ [key: string]: any; a: 1 }>, { a: 1 }>>,
  Expect<
    Equal<
      RemoveIndexSignature<{ [key: string]: any; a: 1; b?: 2 }>,
      { a: 1; b?: 2 }
    >
  >,
  Expect<Equal<RemoveIndexSignature<{ a: 1; b?: 2 }>, { a: 1; b?: 2 }>>,
  Expect<Equal<RemoveIndexSignature<{}>, {}>>
]

class testClass {
  public name: string
  protected age: number
  private hobbies: string[]

  constructor() {
    this.name = 'dong'
    this.age = 20
    this.hobbies = ['sleep', 'eat']
  }
}

type ClassPublicProps<T> = {
  [key in keyof T]: T[key]
}
type cases9 = [Expect<Equal<ClassPublicProps<testClass>, { name: string }>>]
