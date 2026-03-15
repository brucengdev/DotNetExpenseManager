import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it, vitest } from "vitest";
import { MonthlyReportView } from "./MonthlyReportView";
import '@testing-library/jest-dom'
import { TestClient } from "../__test__/TestClient";
import { formatDateToMonthYear } from "../utils";

describe("MonthlyReportView", () => {
     it("Shows month picker and report of selected month", async () => {
        const client = new TestClient()

        client.GetMonthlyReport = vitest.fn(async(month: Date) => {
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
        })
        render(<MonthlyReportView client={client} month={new Date(2026, 2)} />)

        expect(screen.getByTestId("monthly-report-view")).toBeInTheDocument()

        const monthControl = screen.getByLabelText("Month")
        expect(monthControl).toBeInTheDocument()

        expect(monthControl).toHaveValue("2026-03")

        await waitFor(() => {
            expect(screen.getByTestId("total-spendings")).toHaveTextContent("Total spendings: -10")
        })
        expect(screen.getByTestId("total-income")).toHaveTextContent("Total income: 30")
        expect(screen.getByTestId("savings")).toHaveTextContent("Savings: 20")

        const byCategories = screen.getByTestId("by-categories")
        expect(byCategories).toBeInTheDocument()

        const catSummaries = within(byCategories).queryAllByTestId("category-summary")
        const catSummaryTexts = catSummaries.map(e => e.textContent)
        expect(catSummaryTexts).toStrictEqual(
            [
                "Household: -2",
                "Food: -3",
                "Travel: -3",
                "Salary: 30"
            ]
        )
    })
    it("Moves to another month when month picker changes", async () => {
        const client = new TestClient()
        client.GetMonthlyReport = vitest.fn(async(month: Date) => {
            if(formatDateToMonthYear(month) === '2025-03') {
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
                    "Household": -20,
                    "Food": -30,
                    "Travel": -30,
                    "Salary": 300
                },
                totalSpendings: -122,
                totalIncome: 300,
                savings: 200
            }
        })
        render(<MonthlyReportView client={client} month={new Date(2026, 2)} />)

        expect(screen.getByTestId("monthly-report-view")).toBeInTheDocument()

        const monthControl = screen.getByLabelText("Month")
        expect(monthControl).toBeInTheDocument()

        expect(monthControl).toHaveValue("2026-03")

        await waitFor(() => {
            expect(screen.getByTestId("total-spendings")).toHaveTextContent("Total spendings: -10")
        })

        fireEvent.change(monthControl, {target: {value: "2024-02"}})
        expect(monthControl).toHaveValue("2024-02")

        await waitFor(() => {
            expect(screen.getByTestId("total-spendings")).toHaveTextContent("Total spendings: -122")
        })

        expect(screen.getByTestId("total-income")).toHaveTextContent("Total income: 300")
        expect(screen.getByTestId("savings")).toHaveTextContent("Savings: 200")

        const byCategories = screen.getByTestId("by-categories")
        expect(byCategories).toBeInTheDocument()

        const catSummaries = within(byCategories).queryAllByTestId("category-summary")
        const catSummaryTexts = catSummaries.map(e => e.textContent)
        expect(catSummaryTexts).toStrictEqual(
            [
                "Household: -20",
                "Food: -30",
                "Travel: -30",
                "Salary: 300"
            ]
        )
    })
})