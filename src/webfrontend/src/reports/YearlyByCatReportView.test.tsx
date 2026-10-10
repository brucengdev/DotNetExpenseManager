import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it, vitest } from "vitest";
import { YearlyByCatReportView } from "./YearlyByCatReportView";
import "@testing-library/jest-dom"
import { TestClient } from "../__test__/TestClient";
import userEvent from "@testing-library/user-event";
import { YearlyByCategoriesReport } from "../models/YearlyByCategoriesReport";

describe("Yearly by categories report", () => {

    it("has UI components", async () => {
        render(<YearlyByCatReportView  client={new TestClient()}/>)

        expect(screen.getByTestId("yearly-by-cat-report-view")).toBeInTheDocument()

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

    it("changes year when another year is selected", async () => {
        render(<YearlyByCatReportView  client={new TestClient()}/>)

        const yearPicker = screen.getByRole("combobox", { name: "Year"})

        userEvent.selectOptions(yearPicker, "2020")
        
        await waitFor(() => expect(yearPicker).toHaveValue("2020"))
    })

    it("shows the report for currently selected year", async () => {
        const client = new TestClient()
        client.GetYearlyByCategoriesReport = vitest.fn(async (year: number) => {
            if(year === 2020) {
                return {
                    byCategories: {
                    },
                    totalSpendings: -10,
                    totalIncome: 333,
                    savings: 222
                } as YearlyByCategoriesReport    
            }
            return {
                byCategories: {
                    "Household": { totalExpenses: -222, totalIncome: 0, expensePercentage: 0.12345 },
                    "Food": { totalExpenses: -333, totalIncome: 0, expensePercentage: 0.12345 },
                    "Travel": { totalExpenses: -333, totalIncome: 0, expensePercentage: 0.12345 },
                    "Salary": { totalExpenses: 0, totalIncome: 333, expensePercentage: 0 },
                },
                totalSpendings: -122,
                totalIncome: 333,
                savings: 222
            } as YearlyByCategoriesReport
        })
        render(<YearlyByCatReportView  client={client}/>)


        const yearPicker = screen.getByRole("combobox", { name: "Year"})
        fireEvent.change(yearPicker, { target: { value: "2020" }})

        expect(yearPicker).toHaveValue("2020")
        
        await waitFor(() => {
            expect(screen.getByTestId("total-spendings").textContent).toBe("Total spendings-10 ₫")
        })
        
        fireEvent.change(yearPicker, {target: {value: "2024"}})
        expect(yearPicker).toHaveValue("2024")
        
        await waitFor(() => {
            expect(screen.getByTestId("total-spendings").textContent).toBe("Total spendings-122 ₫")
        })

        expect(screen.getByTestId("total-income").textContent).toBe("Total income333 ₫")
        expect(screen.getByTestId("savings").textContent).toBe("Savings222 ₫")

        const byCategories = screen.getByTestId("by-categories")
        expect(byCategories).toBeInTheDocument()

        const catSummaries = within(byCategories).queryAllByTestId("category-summary")
        const catSummaryTexts = catSummaries.map(e => e.textContent)
        expect(catSummaryTexts).toStrictEqual(
            [
                "Household-222 ₫ (12.35%)",
                "Food-333 ₫ (12.35%)",
                "Travel-333 ₫ (12.35%)",
                "Salary0 ₫, 333 ₫"
            ]
        )
        
    })
})