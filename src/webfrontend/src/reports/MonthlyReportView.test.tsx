import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vitest } from "vitest";
import { MonthlyReportView } from "./MonthlyReportView";
import '@testing-library/jest-dom'
import { TestClient } from "../__test__/TestClient";
import { Entry } from "../models/Entry";
import { Category } from "../models/Category";

describe("MonthlyReportView", () => {
    it("Shows the month picker", () => {
        const client = new TestClient()
        render(<MonthlyReportView client={client} month={new Date(2026, 2)} />)

        expect(screen.getByTestId("monthly-report-view")).toBeInTheDocument()

        const monthControl = screen.getByLabelText("Month")
        expect(monthControl).toBeInTheDocument()

        expect(monthControl).toHaveValue("2026-03")
    })

    it("Moves to another month when month picker changes", () => {
        const client = new TestClient()
        render(<MonthlyReportView client={client} month={new Date(2026, 2)} />)

        expect(screen.getByTestId("monthly-report-view")).toBeInTheDocument()

        const monthControl = screen.getByLabelText("Month")
        expect(monthControl).toBeInTheDocument()

        expect(monthControl).toHaveValue("2026-03")

        fireEvent.change(monthControl, { target: { value: "2024-08"} })

        expect(monthControl).toHaveValue("2024-08")
    })

    it("Shows report of selected month", async () => {
        const client = new TestClient()

        client.GetMonthlyReport = vitest.fn(async(month: Date) => {
            return {
                ByCategories: {
                    "Household": -2,
                    "Food": -3,
                    "Travel": -3,
                    "Salary": 30
                },
                TotalSpendings: -10,
                TotalIncome: 30,
                Savings: 20
            }
        })
        render(<MonthlyReportView client={client} month={new Date(2026, 2)} />)

        expect(screen.getByTestId("monthly-report-view")).toBeInTheDocument()

        const monthControl = screen.getByLabelText("Month")
        expect(monthControl).toBeInTheDocument()

        expect(monthControl).toHaveValue("2026-03")

        await waitFor(() => {
            expect(screen.getByTestId("total-spendings")).toHaveTextContent("-10")
        })
        expect(screen.getByTestId("total-income")).toHaveTextContent("30")
        expect(screen.getByTestId("savings")).toHaveTextContent("20")

        expect(screen.getByTestId("by-categories")).toBeInTheDocument()
    })
})