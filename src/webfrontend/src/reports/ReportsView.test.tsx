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

        const yearlyReportButton = screen.getByRole("button", { name: "Yearly by month" })
        expect(yearlyReportButton).toBeInTheDocument()
        expect(yearlyReportButton).toHaveClass("bg-gray-300")

        const yearlyReportByCategoriesButton = screen.getByRole("button", { name: "Yearly by categories" })
        expect(yearlyReportByCategoriesButton).toBeInTheDocument()
        expect(yearlyReportByCategoriesButton).toHaveClass("bg-gray-300")

        expect(screen.getByTestId("monthly-report-view")).toBeInTheDocument()
        expect(screen.queryByTestId("yearly-by-month-report-view")).not.toBeInTheDocument()
        expect(screen.queryByTestId("yearly-by-cat-report-view")).not.toBeInTheDocument()
    })

    it("switches between reports", async () => {
        await render(<ReportsView client={new TestClient()} />)

        expect(screen.getByTestId("reports-view")).toBeInTheDocument()

        const monthlyReportButton = screen.getByRole("button", { name: "Monthly"})
        const yearlyByMonthReportButton = screen.getByRole("button", { name: "Yearly by month" })
        const yearlyByCatReportButton = screen.getByRole("button", { name: "Yearly by categories" })

        fireEvent.click(yearlyByMonthReportButton)

        expect(monthlyReportButton).toHaveClass("bg-gray-300")
        expect(yearlyByMonthReportButton).toHaveClass("bg-indigo-600")
        expect(yearlyByCatReportButton).toHaveClass("bg-gray-300")
        
        expect(screen.queryByTestId("monthly-report-view")).not.toBeInTheDocument()
        expect(screen.getByTestId("yearly-by-month-report-view")).toBeInTheDocument()
        expect(screen.queryByTestId("yearly-by-cat-report-view")).not.toBeInTheDocument()

        fireEvent.click(monthlyReportButton)

        expect(monthlyReportButton).toHaveClass("bg-indigo-600")
        expect(yearlyByMonthReportButton).toHaveClass("bg-gray-300")
        expect(yearlyByCatReportButton).toHaveClass("bg-gray-300")
        
        expect(screen.getByTestId("monthly-report-view")).toBeInTheDocument()
        expect(screen.queryByTestId("yearly-by-month-report-view")).not.toBeInTheDocument()
        expect(screen.queryByTestId("yearly-by-cat-report-view")).not.toBeInTheDocument()

        fireEvent.click(yearlyByCatReportButton)

        expect(monthlyReportButton).toHaveClass("bg-gray-300")
        expect(yearlyByMonthReportButton).toHaveClass("bg-gray-300")
        expect(yearlyByCatReportButton).toHaveClass("bg-indigo-600")
        
        expect(screen.queryByTestId("monthly-report-view")).not.toBeInTheDocument()
        expect(screen.queryByTestId("yearly-by-month-report-view")).not.toBeInTheDocument()
        expect(screen.getByTestId("yearly-by-cat-report-view")).toBeInTheDocument()
    })
})