import { render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it, vitest } from "vitest";
import { YearlyReportView } from "./YearlyReportView";
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event";
import { TestClient } from "../__test__/TestClient";
import { YearlyReport } from "../models/YearlyReport";

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
        client.GetYearlyReport = vitest.fn(async (year: number) => {
            return {
                year,
                months: [
                    {
                        month: 1,
                        spendings: -1000,
                        income: 1200,
                        savings: 200
                    },
                    {
                        month: 3,
                        spendings: -3000,
                        income: 4500,
                        savings: 1500
                    }
                ],
                totalSpendings: -4000,
                totalIncome: 5700,
                totalSavings: 1700
            } as YearlyReport
        })
        render(<YearlyReportView client={client} />)

        await waitFor(() => {
            const monthSummaries = screen.queryAllByTestId("month-summary")
            expect(monthSummaries).toHaveLength(2)
        })

        const monthSummaries = screen.queryAllByTestId("month-summary")
        expect(monthSummaries[0].textContent).toBe("01-1.000 ₫1.200 ₫200 ₫")
        expect(monthSummaries[1].textContent).toBe("03-3.000 ₫4.500 ₫1.500 ₫")

        expect(screen.getByTestId("total-spendings").textContent).toBe("Total spendings-4.000 ₫")
        expect(screen.getByTestId("total-income").textContent).toBe("Total income5.700 ₫")
        expect(screen.getByTestId("total-savings").textContent).toBe("Total savings1.700 ₫")
    })

    it("Must update report when year is changed", async () => {
        const client = new TestClient()
        client.GetYearlyReport = vitest.fn(async (year: number) => {
            if(year === 2020) {
                return {
                    year,
                    months: [
                        {
                            month: 12,
                            spendings: -1000,
                            income: 1200,
                            savings: 200
                        },
                    ],
                    totalSpendings: -1000,
                    totalIncome: 1200,
                    totalSavings: 200
                }
            }
            return {
                year,
                months: [
                    {
                        month: 1,
                        spendings: -1000,
                        income: 1200,
                        savings: 200
                    },
                    {
                        month: 3,
                        spendings: -3000,
                        income: 4500,
                        savings: 1500
                    }
                ],
                totalSpendings: -4000,
                totalIncome: 5700,
                totalSavings: 1700
            } as YearlyReport
        })
        render(<YearlyReportView client={client} />)

        await waitFor(() => {
            const monthSummaries = screen.queryAllByTestId("month-summary")
            expect(monthSummaries).toHaveLength(2)
        })

        let monthSummaries = screen.queryAllByTestId("month-summary")
        expect(monthSummaries[0].textContent).toBe("01-1.000 ₫1.200 ₫200 ₫")
        expect(monthSummaries[1].textContent).toBe("03-3.000 ₫4.500 ₫1.500 ₫")

        expect(screen.getByTestId("total-spendings").textContent).toBe("Total spendings-4.000 ₫")
        expect(screen.getByTestId("total-income").textContent).toBe("Total income5.700 ₫")
        expect(screen.getByTestId("total-savings").textContent).toBe("Total savings1.700 ₫")

        const yearPicker = screen.getByRole("combobox", { name: "Year"})

        userEvent.selectOptions(yearPicker, "2020")

        await waitFor(() => expect(yearPicker).toHaveValue("2020"))

        monthSummaries = screen.queryAllByTestId("month-summary")
        expect(monthSummaries).toHaveLength(1)
        expect(monthSummaries[0].textContent).toBe("12-1.000 ₫1.200 ₫200 ₫")

        expect(screen.getByTestId("total-spendings").textContent).toBe("Total spendings-1.000 ₫")
        expect(screen.getByTestId("total-income").textContent).toBe("Total income1.200 ₫")
        expect(screen.getByTestId("total-savings").textContent).toBe("Total savings200 ₫")
    })
})