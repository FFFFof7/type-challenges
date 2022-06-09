import type { Equal, Expect } from '../test-utils'

type CapitalizeStr<T> = T extends `${infer F}${infer O}`
  ? `${Uppercase<F>}${O}`
  : never
type cases = [
  Expect<Equal<CapitalizeStr<'g'>, 'G'>>,
  Expect<Equal<CapitalizeStr<'guang'>, 'Guang'>>,
  Expect<Equal<CapitalizeStr<'fan'>, 'Fan'>>
]

type CamelCase<T> = T extends `${infer Left}_${infer Right}${infer Reset}`
  ? `${Left}${Uppercase<Right>}${CamelCase<Reset>}`
  : T
type cases2 = [
  Expect<Equal<CamelCase<'guang_guang_guang'>, 'guangGuangGuang'>>,
  Expect<Equal<CamelCase<'guang'>, 'guang'>>,
  Expect<Equal<CamelCase<'fan_fan_fan'>, 'fanFanFan'>>
]

type DropSubStr<T, S extends string> = T extends `${infer F}${S}${infer E}`
  ? DropSubStr<`${F}${E}`, S>
  : T
type cases3 = [
  Expect<Equal<DropSubStr<'abcdefg', 'g'>, 'abcdef'>>,
  Expect<Equal<DropSubStr<'abcdefg', 'a'>, 'bcdefg'>>,
  Expect<Equal<DropSubStr<'abcdefg', 'bc'>, 'adefg'>>,
  Expect<Equal<DropSubStr<'abcdaaefag', 'a'>, 'bcdefg'>>
]
