import { describe, expect, it } from "vitest"
import { ReportsView } from "./ReportsView"
import { TestClient } from "../__test__/TestClient"
import { fireEvent, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'

describe("ReportsView", () => {
    it("has necessary ui components", async () => {
        await render(<ReportsView client={new TestClient()} />)

        expect(screen.getByTestId("reports-view")).toBeInTheDocument()

        const monthlyReportButton = screen.getByRole("button", { name: "Monthly"})
        expect(monthlyReportButton).toBeInTheDocument()
        expect(monthlyReportButton).toHaveClass("bg-indigo-600")

        const yearlyReportButton = screen.getByRole("button", { name: "Yearly" })
        expect(yearlyReportButton).toBeInTheDocument()
        expect(yearlyReportButton).toHaveClass("bg-gray-300")

        expect(screen.getByTestId("monthly-report-view")).toBeInTheDocument()
        expect(screen.queryByTestId("yearly-report-view")).not.toBeInTheDocument()
    })

    it("switches between reports", async () => {
        await render(<ReportsView client={new TestClient()} />)

        expect(screen.getByTestId("reports-view")).toBeInTheDocument()

        const monthlyReportButton = screen.getByRole("button", { name: "Monthly"})
        const yearlyReportButton = screen.getByRole("button", { name: "Yearly" })

        fireEvent.click(yearlyReportButton)

        expect(monthlyReportButton).toHaveClass("bg-gray-300")
        expect(yearlyReportButton).toHaveClass("bg-indigo-600")
        
        expect(screen.queryByTestId("monthly-report-view")).not.toBeInTheDocument()
        expect(screen.getByTestId("yearly-report-view")).toBeInTheDocument()

        fireEvent.click(monthlyReportButton)

        expect(monthlyReportButton).toHaveClass("bg-indigo-600")
        expect(yearlyReportButton).toHaveClass("bg-gray-300")
        
        expect(screen.getByTestId("monthly-report-view")).toBeInTheDocument()
        expect(screen.queryByTestId("yearly-report-view")).not.toBeInTheDocument()  
    })
})