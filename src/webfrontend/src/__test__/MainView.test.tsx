import { screen, render } from "@testing-library/react";
import {describe, expect, it} from 'vitest'
import '@testing-library/jest-dom'
import { MainView } from "../MainView";

describe("MainView", () => {
    it("has necessary ui components", () => {
        render(<MainView />)
        
        const dayButton = screen.getByRole("button", { name: "Day"})
        expect(dayButton).toBeInTheDocument()

        const monthButton = screen.getByRole("button", {name: "Month"})
        expect(monthButton).toBeInTheDocument()
        expect(monthButton.className).not.toContain("selected")

        const yearButton = screen.getByRole("button", {name: "Year"})
        expect(yearButton).toBeInTheDocument()
        expect(yearButton.className).not.toContain("selected")

        const reportsButton = screen.getByRole("button", {name: "Reports"})
        expect(reportsButton).toBeInTheDocument()
        expect(reportsButton.className).not.toContain("selected")
    })

    it("shows day view on initial", () => {
        render(<MainView />)

        const dayButton = screen.getByRole("button", { name: "Day"})
        expect(dayButton).toBeInTheDocument()
        expect(dayButton.className).toContain("selected")

        const dayView = screen.queryByTestId("day-view")
        expect(dayView).toBeInTheDocument()
    })
})