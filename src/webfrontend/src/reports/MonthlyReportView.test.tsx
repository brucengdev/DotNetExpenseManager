import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MonthlyReportView } from "./MonthlyReportView";
import '@testing-library/jest-dom'

describe("MonthlyReportView", () => {
    it("shows report of current month", () => {
        render(<MonthlyReportView />)

        expect(screen.getByTestId("monthly-report-view")).toBeInTheDocument()

        expect(screen.getByLabelText("Month")).toBeInTheDocument()
    })
})