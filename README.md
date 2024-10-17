# dictionary-fn

A simple utility function for typesafe translations.

## Features

* Typesafe translations
* Plurals
* Dynamic params (typesafe)
* Easy definition
* Translation values colocation

## Installation

```bash
pnpm install dictionary-fn
```

## Usage

### 1. Instantiate dictionary utils

```ts
import { createDictionary } from "dictionary-fn"

const { defineDictionary, t } = createDictionary({
  locales: ["en", "it"],
})
```

### 2. Define dictionary

```ts
const dictionary = defineDictionary({
  helloWorld: {
    en: "Hello, World!",
    it: "Ciao, Mondo!"
  }
})
```

### 3. Apply translation

```ts
const locale = "en"
const translation = t(dictionary.helloWorld, { locale })
```

## Plurals

```ts
const dictionary = defineDictionary({
  helloWorld: {
    _zero: {
      en: "No items",
      it: "Nessun elemento"
    },
    _one: {
      en: "One item",
      it: "Un elemento"
    },
    _many: {
      en: "Many items",
      it: "Molti elementi"
    },
    // use _other as fallback value
    _other: {
      en: "Some items",
      it: "Alcuni elementi"
    },
  }
})

const locale = "en"
const translation = t(dictionary.helloWorld, { locale, count: 0 }) // No items
const translation = t(dictionary.helloWorld, { locale, count: 1 }) // One item
const translation = t(dictionary.helloWorld, { locale, count: 2 }) // Many items
```

## Dynamic params

```ts
const dictionary = defineDictionary({
  helloWorld: {
    en: "Hello, {name}!",
    it: "Ciao, {name}!"
  }
})

const locale = "en"
const translation = t(dictionary.helloWorld, { locale, params: { name: "World" } }) // Hello, World!
```

## Easy colocation

*Example in Next.js app router*

```
app/
  [locale]/
    dictionary.ts
    page.tsx
i18n/
  index.ts
```

```ts
// i18n/index.ts

import { createDictionary } from "dictionary-fn"

const { defineDictionary, t } = createDictionary({
  locales: ["en", "it"],
})

export { defineDictionary, t }
```

```ts
// app/[locale]/dictionary.ts

export const homepageDictionary = defineDictionary({
  helloWorld: {
    en: "Hello, World!",
    it: "Ciao, Mondo!"
  }
})
```

```tsx
// app/[locale]/page.tsx

import { homepageDictionary } from "./dictionary"

export default function HomePage({ params }: { params: { locale: "en" | "it" } }) {
  const locale = params.locale

  return (
    <div>
      {t(homepageDictionary.helloWorld, { locale })}
    </div>
  )
}
```
