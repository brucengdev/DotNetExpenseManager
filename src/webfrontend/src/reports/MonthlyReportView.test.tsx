import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it, vitest } from "vitest";
import { MonthlyReportView } from "./MonthlyReportView";
import '@testing-library/jest-dom'
import { TestClient } from "../__test__/TestClient";
import { formatDateToMonthYear } from "../utils";

describe("MonthlyReportView", () => {
     it("Shows month picker and report of selected month", async () => {
        const client = new TestClient()

        client.GetMonthlyReport = vitest.fn(async(_: Date) => {
            return {
                byCategories: {
                    "Household": -2000,
                    "Food": -3000,
                    "Travel": -3000,
                    "Salary": 30000
                },
                totalSpendings: -10000,
                totalIncome: 30000,
                savings: 20000
            }
        })
        render(<MonthlyReportView client={client} month={new Date(2026, 2)} />)

        expect(screen.getByTestId("monthly-report-view")).toBeInTheDocument()

        const monthControl = screen.getByLabelText("Month")
        expect(monthControl).toBeInTheDocument()

        expect(monthControl).toHaveValue("2026-03")

        await waitFor(() => {
            expect(screen.getByTestId("total-spendings").textContent).toBe("Total spendings: -10.000 ₫")
        })
        expect(screen.getByTestId("total-income").textContent).toBe("Total income: 30.000 ₫")
        expect(screen.getByTestId("savings").textContent).toBe("Savings: 20.000 ₫")

        const byCategories = screen.getByTestId("by-categories")
        expect(byCategories).toBeInTheDocument()

        const catSummaries = within(byCategories).queryAllByTestId("category-summary")
        const catSummaryTexts = catSummaries.map(e => e.textContent)
        expect(catSummaryTexts).toStrictEqual(
            [
                "Household: -2.000 ₫",
                "Food: -3.000 ₫",
                "Travel: -3.000 ₫",
                "Salary: 30.000 ₫"
            ]
        )
    })
    it("Moves to another month when month picker changes", async () => {
        const client = new TestClient()
        client.GetMonthlyReport = vitest.fn(async(month: Date) => {
            const monthStr = formatDateToMonthYear(month)
            if(monthStr === '2026-03') {
                return {
                    byCategories: {
                        "Household": -2,
                        "Food": -3,
                        "Travel": -3,
                        "Salary": 30
                    },
                    totalSpendings: -10,
                    totalIncome: 30,
                    savings: 20
                }
            }

            //2024-02
            return {
                byCategories: {
                    "Household": -222,
                    "Food": -333,
                    "Travel": -333,
                    "Salary": 333
                },
                totalSpendings: -122,
                totalIncome: 333,
                savings: 222
            }
        })
        render(<MonthlyReportView client={client} month={new Date(2026, 2)} />)

        expect(screen.getByTestId("monthly-report-view")).toBeInTheDocument()

        const monthControl = screen.getByLabelText("Month")
        expect(monthControl).toBeInTheDocument()

        expect(monthControl).toHaveValue("2026-03")

        await waitFor(() => {
            expect(screen.getByTestId("total-spendings").textContent).toBe("Total spendings: -10 ₫")
        })

        fireEvent.change(monthControl, {target: {value: "2024-02"}})
        expect(monthControl).toHaveValue("2024-02")

        await waitFor(() => {
            expect(screen.getByTestId("total-spendings").textContent).toBe("Total spendings: -122 ₫")
        })

        expect(screen.getByTestId("total-income").textContent).toBe("Total income: 333 ₫")
        expect(screen.getByTestId("savings").textContent).toBe("Savings: 222 ₫")

        const byCategories = screen.getByTestId("by-categories")
        expect(byCategories).toBeInTheDocument()

        const catSummaries = within(byCategories).queryAllByTestId("category-summary")
        const catSummaryTexts = catSummaries.map(e => e.textContent)
        expect(catSummaryTexts).toStrictEqual(
            [
                "Household: -222 ₫",
                "Food: -333 ₫",
                "Travel: -333 ₫",
                "Salary: 333 ₫"
            ]
        )
    })
})