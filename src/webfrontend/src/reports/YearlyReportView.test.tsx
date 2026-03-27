import { render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it, vitest } from "vitest";
import { YearlyReportView } from "./YearlyReportView";
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event";
import { TestClient } from "../__test__/TestClient";

describe("Yearly report", () => {

    it("has UI components", async () => {
        render(<YearlyReportView  client={new TestClient()}/>)

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

    it("switches year when user changes year", async () => {
        render(<YearlyReportView  client={new TestClient()}/>)

        const yearPicker = screen.getByRole("combobox", { name: "Year"})

        userEvent.selectOptions(yearPicker, "2020")

        await waitFor(() => expect(yearPicker).toHaveValue("2020"))
    })

    it("Shows the report for chosen year", async () => {
        const client = new TestClient()
        client.GetYearlyReport = vitest.fn(async (_year: number) => {
            return {
                year: _year,
                months: [
                    {
                        month: 1,
                        spendings: -100,
                        income: 120,
                        savings: 20
                    },
                    {
                        month: 3,
                        spendings: -300,
                        income: 450,
                        savings: 150
                    }
                ]
            }
        })
        render(<YearlyReportView client={client} />)

        await waitFor(() => {
            const monthSummaries = screen.queryAllByTestId("month-summary")
            expect(monthSummaries).toHaveLength(2)
        })

        const monthSummaries = screen.queryAllByTestId("month-summary")
        expect(monthSummaries[0].textContent).toBe("01-100 ₫120 ₫20 ₫")
        expect(monthSummaries[1].textContent).toBe("03-300 ₫450 ₫150 ₫")
    })
})