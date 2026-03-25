import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { YearlyReportView } from "./YearlyReportView";
import "@testing-library/jest-dom"

describe("Yearly report", () => {

    it("has UI components", async () => {
        render(<YearlyReportView />)

        expect(screen.getByTestId("yearly-report-view")).toBeInTheDocument()

        const yearPicker = screen.getByRole("combobox", { name: "Year"})
        expect(yearPicker).toBeInTheDocument()

        const currentYear = (new Date()).getFullYear()
        expect(yearPicker).toHaveValue(currentYear.toString())

        const options = within(yearPicker).getAllByRole("option")
        expect(options.length).toBe(currentYear - 2013 + 1)

        for(let i = 0; i < currentYear - 2013 + 1; i++) {
            const expectedYear = currentYear - i;
            expect(options[i]).toHaveValue(expectedYear.toString())
        }
    })

})