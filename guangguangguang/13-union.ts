import type { Equal, Expect } from '../test-utils'
type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : false
type cases = [
  Expect<Equal<IsUnion<'a' | 'b' | 'c'>, true>>,
  Expect<Equal<IsUnion<1 | 2 | 3>, true>>,
  Expect<Equal<IsUnion<1>, false>>,
  Expect<Equal<IsUnion<any>, false>>
]

type BEM<
  Block extends string,
  Element extends string,
  Modifiers extends string
> = `${Block}_${Element}_${Modifiers}`
type cases2 = [
  Expect<
    Equal<
      BEM<'fan', 'a' | 'b', '1' | '2'>,
      'fan_a_1' | 'fan_a_2' | 'fan_b_1' | 'fan_b_2'
    >
  >
]

type Combinations<A extends string, B extends string> =
  | `${A}`
  | `${B}`
  | `${A}${B}`
  | `${B}${A}`

type AllCombinations<A extends string, B extends string = A> = A extends A
  ? `${Combinations<A, AllCombinations<Exclude<B, A>>>}`
  : never

type cases3 = [
  Expect<Equal<AllCombinations<'A' | 'B'>, 'A' | 'B' | 'BA' | 'AB'>>
]
