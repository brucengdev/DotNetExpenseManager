import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { YearlyReportView } from "./YearlyReportView";
import "@testing-library/jest-dom"

describe("Yearrly report", () => 
    it("has UI components", async () => {
        render(<YearlyReportView year={2023} />)

        expect(screen.getByTestId("yearly-report-view")).toBeInTheDocument()

        const yearPicker = screen.getByRole("combobox", { name: "Year"})
        expect(yearPicker).toBeInTheDocument()

        expect(yearPicker).toHaveValue("2023")
    })
)