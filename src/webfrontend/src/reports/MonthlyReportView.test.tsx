import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
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

    it("Shows report of selected month", () => {
        const client = new TestClient()
        client.Categories = [
            new Category(1, "Uncategorized"),
            new Category(2, "Household"),
            new Category(3, "Food"),
            new Category(4, "Salary")
        ]
        const catId = (name: string) => client.Categories.find(c => c.name === name)?.id
        client.Entries = [
            new Entry(1, new Date(2026, 1, 12), "entry 1", -10, catId("Household")),
            new Entry(2, new Date(2026, 1, 12), "entry 2", -2, catId("Household")),

            new Entry(3, new Date(2026, 2, 8), "entry 3", -4, catId("Household")),
            new Entry(4, new Date(2026, 2, 9), "entry 4", -6, catId("Food")),
            new Entry(5, new Date(2026, 2, 22), "entry 5", 10, catId("Salary")),
            new Entry(6, new Date(2026, 2, 25), "entry 6", 20, catId("Salary")),
            
            new Entry(7, new Date(2026, 1, 12), "entry 7", -20, catId("Household"))
        ]
        render(<MonthlyReportView client={client} month={new Date(2026, 2)} />)

        expect(screen.getByTestId("monthly-report-view")).toBeInTheDocument()

        const monthControl = screen.getByLabelText("Month")
        expect(monthControl).toBeInTheDocument()

        expect(monthControl).toHaveValue("2026-03")

        expect(screen.getByTestId("total-spendings")).toHaveTextContent("-10")
        expect(screen.getByTestId("total-income")).toHaveTextContent("30")
        expect(screen.getByTestId("savings")).toHaveTextContent("20")
    })
})