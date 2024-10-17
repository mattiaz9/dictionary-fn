import { describe, expect, it, assertType } from "vitest"
import { createDictionary } from "@/index"

const { defineDictionary, t } = createDictionary({
  locales: ["en", "it"],
})

const testDictionary = defineDictionary({
  testSingular: {
    en: "Test A",
    it: "Test A IT",
  },
  testPlural: {
    _zero: {
      en: "No tests",
      it: "Nessun test",
    },
    _one: {
      en: "One test",
      it: "Un test",
    },
    _many: {
      en: "Many tests",
      it: "Molti test",
    },
    _other: {
      en: "Other tests",
      it: "Altri test",
    },
  },
  testSingularWithParams: {
    en: "Hello {name}",
    it: "Ciao {name}",
  },
  testPluralWithParams: {
    _zero: {
      en: "No {name}",
      it: "Nessun {name}",
    },
    _one: {
      en: "One {name}",
      it: "Un {name}",
    },
    _many: {
      en: "Many {name}",
      it: "Molti {name}",
    },
    _other: {
      en: "Other {name}",
      it: "Altri {name}",
    },
  },
})

describe("t", () => {
  it("should return the correct translation for singular", () => {
    expect(t(testDictionary.testSingular, { locale: "en" })).toBe("Test A")
    expect(t(testDictionary.testSingular, { locale: "it" })).toBe("Test A IT")
  })

  it("should return the correct translation for plural", () => {
    expect(t(testDictionary.testPlural, { locale: "en", count: 0 })).toBe("No tests")
    expect(t(testDictionary.testPlural, { locale: "en", count: 1 })).toBe("One test")
    expect(t(testDictionary.testPlural, { locale: "en", count: 2 })).toBe("Many tests")

    expect(t(testDictionary.testPlural, { locale: "it", count: 0 })).toBe("Nessun test")
    expect(t(testDictionary.testPlural, { locale: "it", count: 1 })).toBe("Un test")
    expect(t(testDictionary.testPlural, { locale: "it", count: 2 })).toBe("Molti test")
  })

  it("should return 'other' translation when 'zero' is missing and count is 0", () => {
    const copy = { ...testDictionary.testPlural }
    // @ts-expect-error
    delete copy._zero

    expect(t(copy, { locale: "en", count: 0 })).toBe("Other tests")
  })

  it("should return 'other' translation when 'one' is missing and count is 1", () => {
    const copy = { ...testDictionary.testPlural }
    // @ts-expect-error
    delete copy._one

    expect(t(copy, { locale: "en", count: 1 })).toBe("Other tests")
  })

  it("should return 'other' translation when 'many' is missing and count is 2", () => {
    const copy = { ...testDictionary.testPlural }
    // @ts-expect-error
    delete copy._many

    expect(t(copy, { locale: "en", count: 2 })).toBe("Other tests")
  })

  it("should return the correct translation for singular with params", () => {
    expect(
      t(testDictionary.testSingularWithParams, { locale: "en", params: { name: "John" } })
    ).toBe("Hello John")
    expect(
      t(testDictionary.testSingularWithParams, { locale: "it", params: { name: "John" } })
    ).toBe("Ciao John")
  })

  it("should return the correct translation for plural with params", () => {
    expect(
      t(testDictionary.testPluralWithParams, {
        locale: "en",
        count: 0,
        params: { name: "John" },
      })
    ).toBe("No John")
    expect(
      t(testDictionary.testPluralWithParams, { locale: "en", count: 1, params: { name: "John" } })
    ).toBe("One John")
    expect(
      t(testDictionary.testPluralWithParams, { locale: "en", count: 2, params: { name: "John" } })
    ).toBe("Many John")

    expect(
      t(testDictionary.testPluralWithParams, { locale: "it", count: 0, params: { name: "John" } })
    ).toBe("Nessun John")
    expect(
      t(testDictionary.testPluralWithParams, { locale: "it", count: 1, params: { name: "John" } })
    ).toBe("Un John")
    expect(
      t(testDictionary.testPluralWithParams, { locale: "it", count: 2, params: { name: "John" } })
    ).toBe("Molti John")
  })
})
