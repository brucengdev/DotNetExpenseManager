import { screen, render } from "@testing-library/react";
import {describe, expect, it} from 'vitest'
import '@testing-library/jest-dom'
import { MainView } from "../MainView";

describe("MainView", () => {
    it("has necessary ui components", () => {
        render(<MainView  />)
        
        const dayButton = screen.getByRole("button", { name: "Day"})
        expect(dayButton).toBeInTheDocument()
        expect(dayButton.className).toContain("selected")

        const monthButton = screen.getByRole("button", {name: "Month"})
        expect(monthButton).toBeInTheDocument()
        expect(monthButton.className).not.toContain("selected")

        const yearButton = screen.getByRole("button", {name: "Year"})
        expect(yearButton).toBeInTheDocument()
        expect(yearButton.className).not.toContain("selected")

        const logButton = screen.getByRole("button", {name: "Log"})
        expect(logButton).toBeInTheDocument()
    })
})