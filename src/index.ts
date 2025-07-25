import {
  Dictionary,
  DictionaryItem,
  DictionaryPlurals,
  DictionaryTranslations,
  TPluralOptions,
  TSingularOptions,
} from "./types"

export interface CreateDictionaryDefinerOptions<TLocale extends string> {
  locales: TLocale[] | readonly TLocale[]
}

export function createDictionary<TLocale extends string>(
  options: CreateDictionaryDefinerOptions<TLocale>
) {
  function defineDictionary<const TDictionary extends Dictionary<TLocale>>(
    dictionary: TDictionary
  ): TDictionary {
    return dictionary
  }

  function defineDictionaryWithKeys<const TKeys extends string>(keys?: readonly TKeys[]) {
    return function <const TDictionary extends Dictionary<TLocale, TKeys>>(
      dictionary: TDictionary
    ): TDictionary {
      return dictionary
    }
  }

  function t<TItem extends DictionaryTranslations<TLocale>>(
    key: TItem,
    options: TSingularOptions<TLocale, TItem>
  ): string
  function t<TItem extends DictionaryPlurals<TLocale>>(
    plurals: TItem,
    options: TPluralOptions<TLocale, TItem>
  ): string
  function t<TItem extends DictionaryItem<TLocale>>(
    item: TItem,
    options: TSingularOptions<TLocale, any> | TPluralOptions<TLocale, any>
  ): string {
    const locale = options.locale
    const translationValue = ((): string => {
      if ("_zero" in item || "_one" in item || "_many" in item || "_other" in item) {
        const count = (options as TPluralOptions<any, any>).count
        const fallback = item._other?.[locale] ?? "[MISSING_PLURAL_TRANSLATION]"
        if (count === 0) {
          return item._zero?.[locale] ?? fallback
        } else if (count === 1) {
          return item._one?.[locale] ?? fallback
        } else if (count > 1) {
          return item._many?.[locale] ?? fallback
        } else {
          return fallback
        }
      } else {
        return (item as DictionaryTranslations<TLocale>)[locale]
      }
    })()

    if ("params" in options) {
      return translationValue.replace(
        /{(\w+)}/g,
        (match, key) => (options.params as Record<string, any>)[key] ?? match
      )
    }

    return translationValue
  }

  return {
    defineDictionary,
    defineDictionaryWithKeys,
    t,
  }
}
