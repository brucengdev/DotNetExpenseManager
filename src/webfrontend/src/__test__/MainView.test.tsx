import { screen, render } from "@testing-library/react";
import {describe, expect, it} from 'vitest'
import '@testing-library/jest-dom'
import { MainView } from "../MainView";

describe("MainView", () => {
    it("has necessary ui components", () => {
        render(<MainView  />)
        
        const todayButton = screen.getByRole("button", { name: "Today"})
        expect(todayButton).toBeInTheDocument()
        expect(todayButton.className).toContain("selected")

        const thisMonthButton = screen.getByRole("button", {name: "This month"})
        expect(thisMonthButton).toBeInTheDocument()
        expect(thisMonthButton.className).not.toContain("selected")

        const yearButton = screen.getByRole("button", {name: "Year"})
        expect(yearButton).toBeInTheDocument()
        expect(yearButton.className).not.toContain("selected")
    })
})