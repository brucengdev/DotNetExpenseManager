import { screen, render } from "@testing-library/react";
import {describe, expect, it} from 'vitest'
import '@testing-library/jest-dom'
import { MainView } from "../MainView";

describe("MainView", () => {
    it("has necessary ui components", () => {
        render(<MainView />)
        
        const dayButton = screen.getByRole("button", { name: "Day"})
        expect(dayButton).toBeInTheDocument()
    })

    it("shows day view on initial", () => {
        render(<MainView />)

        const dayButton = screen.getByRole("button", { name: "Day"})
        expect(dayButton).toBeInTheDocument()
        expect(dayButton.className).toContain("selected")

        const dayView = screen.getByTestId("day-view")
        expect(dayView).toBeInTheDocument()
    })
})