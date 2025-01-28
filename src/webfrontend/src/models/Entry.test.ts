import { describe, expect, test } from "vitest"
import { Entry } from "./Entry"

describe("Entry", () => {
    test("test Equals", () => {
        const entry1 = new Entry(1, new Date(2024, 12, 2), "foo", -12.22)
        entry1.categoryId = 2
        const entry2 = new Entry(1, new Date(2024, 12, 2), "foo", -12.22)
        entry2.categoryId = 2
        expect(entry1.Equals(entry2)).toBeTruthy()
    })

    test("Equals must be false when categories are different", () => {
        const entry1 = new Entry(1, new Date(2024, 12, 2), "foo", -12.22)
        entry1.categoryId = 1
        const entry2 = new Entry(1, new Date(2024, 12, 2), "foo", -12.22)
        entry2.categoryId = 2
        expect(entry1.Equals(entry2)).toBeFalsy()
    })

    test("Equals must be false when dates are different", () => {
        const entry1 = new Entry(1, new Date(2024, 12, 1), "foo", -12.22)
        entry1.categoryId = 1
        const entry2 = new Entry(1, new Date(2024, 12, 2), "foo", -12.22)
        entry2.categoryId = 1
        expect(entry1.Equals(entry2)).toBeFalsy()
    })

    test("Equals must be false when ids are different", () => {
        const entry1 = new Entry(1, new Date(2024, 12, 1), "foo", -12.22)
        entry1.categoryId = 1
        const entry2 = new Entry(1, new Date(2024, 12, 2), "foo", -12.22)
        entry2.categoryId = 1
        expect(entry1.Equals(entry2)).toBeFalsy()
    })

    test("Equals must be false when titles are different", () => {
        const entry1 = new Entry(1, new Date(2024, 12, 1), "foo", -12.22)
        entry1.categoryId = 1
        const entry2 = new Entry(1, new Date(2024, 12, 1), "foo2", -12.22)
        entry2.categoryId = 1
        expect(entry1.Equals(entry2)).toBeFalsy()
    })

    test("Equals must be false when values are different", () => {
        const entry1 = new Entry(1, new Date(2024, 12, 1), "foo", -12.22)
        entry1.categoryId = 1
        const entry2 = new Entry(1, new Date(2024, 12, 1), "foo", -12.23)
        entry2.categoryId = 1
        expect(entry1.Equals(entry2)).toBeFalsy()
    })
})