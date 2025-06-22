import { screen, render } from "@testing-library/react";
import {describe, expect, it} from 'vitest'
import '@testing-library/jest-dom'
import { MainView } from "./MainView";
import { TestClient } from "./__test__/TestClient";

describe("MainView", () => {
    it("has necessary ui components", () => {
        render(<MainView client={new TestClient()} onLogout={() => { }} />)
        
        const dayButton = screen.getByRole("button", { name: "Day"})
        expect(dayButton).toBeInTheDocument()

        const logoutButton = screen.getByRole("button", { name: "Log out"})
        expect(logoutButton).toBeInTheDocument()
    })

    it("shows day view on initial", () => {
        render(<MainView client={new TestClient()} onLogout={() => { }} />)

        const dayButton = screen.getByRole("button", { name: "Day"})
        expect(dayButton).toBeInTheDocument()
        expect(dayButton.className).toContain("bg-indigo-600")

        const dayView = screen.getByTestId("day-view")
        expect(dayView).toBeInTheDocument()
    })
})