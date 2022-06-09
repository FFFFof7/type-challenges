import type { Equal, Expect } from '../test-utils'
type KebabCaseToCamelCase<T> = T extends `${infer I}-${infer Rest}`
  ? `${I}${KebabCaseToCamelCase<Capitalize<Rest>>}`
  : T
type cases1 = [
  Expect<Equal<KebabCaseToCamelCase<'a-b-c'>, 'aBC'>>,
  Expect<Equal<KebabCaseToCamelCase<'fan-hui-min'>, 'fanHuiMin'>>,
  Expect<Equal<KebabCaseToCamelCase<'abc'>, 'abc'>>
]

type CamelCaseToKebabCase<T> = T extends `${infer S}${infer Rest}`
  ? S extends Lowercase<S>
    ? `${S}${CamelCaseToKebabCase<Rest>}`
    : `-${Lowercase<S>}${CamelCaseToKebabCase<Rest>}`
  : T

type cases2 = [
  Expect<Equal<CamelCaseToKebabCase<'aBC'>, 'a-b-c'>>,
  Expect<Equal<CamelCaseToKebabCase<'fanHuiMin'>, 'fan-hui-min'>>,
  Expect<Equal<CamelCaseToKebabCase<'abc'>, 'abc'>>
]

type Chunk<
  T,
  ChunkNum = 2,
  ChunkItem extends unknown[] = [],
  Result extends unknown[] = []
> = T extends [infer F, ...infer Rest]
  ? [...ChunkItem, F]['length'] extends ChunkNum
    ? Chunk<Rest, ChunkNum, [], [...Result, [...ChunkItem, F]]>
    : Chunk<Rest, ChunkNum, [...ChunkItem, F], Result>
  : ChunkItem['length'] extends 0
  ? Result
  : [...Result, ChunkItem]
type cases3 = [
  Expect<Equal<Chunk<[1, 2, 3, 4]>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4, 5]>, [[1, 2], [3, 4], [5]]>>,
  Expect<Equal<Chunk<[]>, []>>,
  Expect<Equal<Chunk<[], 10>, []>>,
  Expect<Equal<Chunk<[1, 2, 3, 4, 5, 6], 3>, [[1, 2, 3], [4, 5, 6]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4, 5], 3>, [[1, 2, 3], [4, 5]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4, 5], 9>, [[1, 2, 3, 4, 5]]>>
]

type TupleToNestedObject<T extends unknown[], Value> = T extends [
  infer Item,
  ...infer Rest
]
  ? {
      [key in Item as key extends keyof any ? key : never]: TupleToNestedObject<
        Rest,
        Value
      >
    }
  : Value
type cases4 = [
  Expect<
    Equal<TupleToNestedObject<['a', 'b', 'c'], 1>, { a: { b: { c: 1 } } }>
  >,
  Expect<
    Equal<
      TupleToNestedObject<['a', 'b', 'c', number], 1>,
      { a: { b: { c: { [key: number]: 1 } } } }
    >
  >,
  Expect<
    Equal<
      TupleToNestedObject<['a', 'b', 'c', undefined], 1>,
      { a: { b: { c: {} } } }
    >
  >
]

type Copy<Obj extends Record<string, any>> = {
  [Key in keyof Obj]: Obj[Key]
}
type PartialObjectPropByKeys<T, Key extends keyof any> = Copy<
  Partial<Pick<T, Extract<keyof T, Key>>> & Omit<T, Key>
>
type cases5 = [
  Expect<
    Equal<
      PartialObjectPropByKeys<{ a: 1; b: 2; c: 3 }, 'a' | 'b'>,
      { a?: 1; b?: 2; c: 3 }
    >
  >,
  Expect<
    Equal<
      PartialObjectPropByKeys<{ a: 1; b: 2; c: 3 }, 'a' | 'b' | 'c'>,
      { a?: 1; b?: 2; c?: 3 }
    >
  >
]

type UnionToIntersection<U> = (
  U extends U ? (x: U) => unknown : never
) extends (x: infer R) => unknown
  ? R
  : never
type UnionToTuple<T> = UnionToIntersection<
  T extends T ? () => T : never
> extends () => infer R
  ? [...UnionToTuple<Exclude<T, R>>, R]
  : []
/**
 * [2, 1, 3], [2, 3, "a"]
 * sort is random
 */
type cases6 = [UnionToTuple<1 | 2 | 3>, UnionToTuple<'a' | 2 | 3>]

type RemoveLastDelimiter<
  T extends string,
  Delimiter
> = T extends `${infer S}${Delimiter & string}` ? S : T
type JoinType<Items extends any[], Delimiter extends string> = Items extends [
  infer F,
  ...infer Rest
]
  ? RemoveLastDelimiter<
      `${F & string}${Delimiter}${JoinType<Rest, Delimiter>}`,
      Delimiter
    >
  : ''

declare function join<Delimiter extends string>(
  delimiter: Delimiter
): <Items extends string[]>(...parts: Items) => JoinType<Items, Delimiter>

const str = join('-')('abc', '1', '2')

type camelCase<T> = T extends `${infer F}_${infer Rest}`
  ? `${F}${Capitalize<camelCase<Rest>>}`
  : T
type DeepArr<T extends unknown[]> = T extends [infer F, ...infer Rest]
  ? [DeepCamelize<F>, ...DeepArr<Rest>]
  : []
type DeepCamelize<T> = T extends Record<string, any>
  ? T extends any[]
    ? DeepArr<T>
    : {
        [key in keyof T as camelCase<key>]: DeepCamelize<T[key]>
      }
  : T
type cases7 = [
  Expect<
    Equal<
      DeepCamelize<{
        aa_c: 1
        ss_d: { ss_g: 5; ss_a: [1, 2, 3, { a_a: 1 }] }
      }>,
      {
        aaC: 1
        ssD: {
          ssG: 5
          ssA: [
            1,
            2,
            3,
            {
              aA: 1
            }
          ]
        }
      }
    >
  >
]

type Defaultize<T1, T2> = {
  [key in keyof T1 as key extends keyof T2 ? never : key]: T1[key]
} & {
  [key in keyof T1 as key extends keyof T2 ? key : never]?: T1[key]
} & {
  [key in Exclude<keyof T2, keyof T1>]?: T2[key]
}

type Defaultize2<T1, T2> = Pick<T1, Exclude<keyof T1, keyof T2>> &
  Partial<Pick<T1, Extract<keyof T1, keyof T2>>> &
  Partial<Pick<T2, Exclude<keyof T2, keyof T1>>>

type Defaultize3<T1, T2> = Omit<T1, keyof T2> & Partial<T2>
type test = Copy<Defaultize3<{ a: 1; b: 2 }, { a: 22; c: 3 }>>
