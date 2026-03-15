import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MonthlyReportView } from "./MonthlyReportView";
import '@testing-library/jest-dom'
import { TestClient } from "../__test__/TestClient";

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
})