import { describe, expect, test } from "vitest"
import { Entry } from "../api/Entry"

describe("Entry", () => {
    test("test Equals", () => {
        const entry1 = new Entry(1, new Date(2024, 12, 2), "foo", -12.22)
        entry1.categoryId = 2
        const entry2 = new Entry(1, new Date(2024, 12, 2), "foo", -12.22)
        entry2.categoryId = 2
        expect(entry1.Equals(entry2)).toBeTruthy()
    })
})