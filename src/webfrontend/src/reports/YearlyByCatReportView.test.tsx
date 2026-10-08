import { render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { YearlyByCatReportView } from "./YearlyByCatReportView";
import "@testing-library/jest-dom"
import { TestClient } from "../__test__/TestClient";
import userEvent from "@testing-library/user-event";

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
})