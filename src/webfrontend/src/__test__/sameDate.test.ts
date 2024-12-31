import { describe, expect, it } from "vitest"
import { sameDate } from "../utils"

describe("sameDate", () => {
    it("returns true when two dates are in same day", () => {
        const date1 = new Date(2024, 12, 12, 19, 15, 22)
        const date2 = new Date(2024, 12, 12, 16, 5, 37)

        expect(sameDate(date1, date2)).toBeTruthy()
    })

    it("returns false when two dates are different days", () => {
        const date1 = new Date(2024, 12, 12, 19, 15, 22)
        const date2 = new Date(2024, 12, 13, 16, 5, 37)

        expect(sameDate(date1, date2)).toBeFalsy()
    })

    it("returns false when two dates are different months", () => {
        const date1 = new Date(2024, 6, 12, 19, 15, 22)
        const date2 = new Date(2024, 12, 13, 16, 5, 37)

        expect(sameDate(date1, date2)).toBeFalsy()
    })
})