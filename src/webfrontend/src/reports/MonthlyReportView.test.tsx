import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MonthlyReportView } from "./MonthlyReportView";
import '@testing-library/jest-dom'

describe("MonthlyReportView", () => {
    it("shows report of current month", () => {
        render(<MonthlyReportView month={new Date(2026, 2)} />)

        expect(screen.getByTestId("monthly-report-view")).toBeInTheDocument()

        const monthControl = screen.getByLabelText("Month")
        expect(monthControl).toBeInTheDocument()

        expect(monthControl).toHaveValue("2026-03")
    })
})