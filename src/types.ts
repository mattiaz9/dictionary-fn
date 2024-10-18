export type Dictionary<TLocale extends string> = {
  [key: string]: DictionaryItem<TLocale>
}

export type DictionaryTranslations<TLocale extends string> = Record<TLocale, string>

export interface DictionaryPlurals<TLocale extends string> {
  _zero?: DictionaryTranslations<TLocale>
  _one?: DictionaryTranslations<TLocale>
  _many?: DictionaryTranslations<TLocale>
  _other?: DictionaryTranslations<TLocale>
}

export type DictionaryItem<TLocale extends string> =
  | DictionaryPlurals<TLocale>
  | DictionaryTranslations<TLocale>

export type TSingularOptions<
  TLocale extends string,
  TItem extends DictionaryTranslations<TLocale>
> = Prettify<
  {
    locale: TLocale
  } & Params<TLocale, TItem>
>

export type TPluralOptions<
  TLocale extends string,
  TItem extends DictionaryPlurals<TLocale>
> = Prettify<
  {
    locale: TLocale
    count: number
  } & Params<TLocale, TItem>
>

type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

type Split<S extends string, D extends string> = string extends S
  ? string[]
  : S extends `${infer T}${D}${infer U}`
  ? [T, ...Split<U, D>]
  : [S]

type Params<TLocale extends string, TItem extends DictionaryItem<TLocale>> = HasParams<
  TLocale,
  TItem
> extends true
  ? {
      params: Prettify<{ [key in DictionaryItemValues<TItem>]: string | number | boolean }>
    }
  : {}

type HasParams<
  TLocale extends string,
  TItem extends DictionaryItem<TLocale>
> = DictionaryItemValues<TItem> extends "" ? false : true

type DictionaryItemValues<T extends DictionaryItem<string>> =
  T extends DictionaryTranslations<string>
    ? AllDynamicParams<T[keyof T]>
    : T[keyof T] extends infer U
    ? U extends DictionaryTranslations<string>
      ? AllDynamicParams<U[keyof U]>
      : ""
    : ""

type AllDynamicParams<T extends string> = Split<T, "{">[number] extends infer U
  ? U extends `${infer Param}}${string}`
    ? Param
    : never
  : never
