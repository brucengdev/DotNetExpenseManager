import { screen, render, fireEvent } from "@testing-library/react";
import {describe, expect, it} from 'vitest'
import '@testing-library/jest-dom'
import { MainView } from "./MainView";
import { TestClient } from "./__test__/TestClient";

describe("MainView", () => {
    it("has necessary ui components", () => {
        render(<MainView client={new TestClient()} onLogout={() => { }} />)
        
        const dayButton = screen.getByRole("button", { name: "Day"})
        expect(dayButton).toBeInTheDocument()

        const tagButton = screen.getByRole("button", { name: "Tags"})
        expect(tagButton).toBeInTheDocument()

        const payeesButton = screen.getByRole("button", { name: "Payees"})
        expect(payeesButton).toBeInTheDocument()

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

        expect(screen.queryByTestId("tags-view")).not.toBeInTheDocument()
        expect(screen.queryByTestId("payees-view")).not.toBeInTheDocument()

        //check highlighted button
        expect(screen.getByRole("button", { name: "Day"}).className).toContain("bg-indigo-600")
        expect(screen.getByRole("button", { name: "Tags"}).className).toContain("bg-gray-300")
        expect(screen.getByRole("button", { name: "Payees"}).className).toContain("bg-gray-300")
    })
    it("shows tags view when clicked on", () => {
        render(<MainView client={new TestClient()} onLogout={() => { }} />)

        const tagsButton = screen.getByRole("button", { name: "Tags"})
        expect(tagsButton).toBeInTheDocument()

        fireEvent.click(tagsButton)

        const tagsView = screen.getByTestId("tags-view")
        expect(tagsView).toBeInTheDocument()

        expect(screen.queryByTestId("day-view")).not.toBeInTheDocument()
        expect(screen.queryByTestId("payees-view")).not.toBeInTheDocument()

        expect(screen.getByRole("button", { name: "Day"}).className).toContain("bg-gray-300")
        expect(screen.getByRole("button", { name: "Tags"}).className).toContain("bg-indigo-600")
        expect(screen.getByRole("button", { name: "Payees"}).className).toContain("bg-gray-300")
    })

    it("shows days view when clicked on", () => {
        render(<MainView client={new TestClient()} onLogout={() => { }} />)

        const tagsButton = screen.getByRole("button", { name: "Tags"})
        expect(tagsButton).toBeInTheDocument()

        fireEvent.click(tagsButton)

        const tagsView = screen.getByTestId("tags-view")
        expect(tagsView).toBeInTheDocument()

        expect(screen.queryByTestId("day-view")).not.toBeInTheDocument()

        fireEvent.click(screen.getByRole("button", { name: "Day"}))

        const dayView = screen.getByTestId("day-view")
        expect(dayView).toBeInTheDocument()

        expect(screen.queryByTestId("tags-view")).not.toBeInTheDocument()
        expect(screen.queryByTestId("payees-view")).not.toBeInTheDocument()

        expect(screen.getByRole("button", { name: "Day"}).className).toContain("bg-indigo-600")
        expect(screen.getByRole("button", { name: "Tags"}).className).toContain("bg-gray-300")
        expect(screen.getByRole("button", { name: "Payees"}).className).toContain("bg-gray-300")
    })

    it("shows payees view when clicked on", () => {
        render(<MainView client={new TestClient()} onLogout={() => { }} />)

        const payeesButton = screen.getByRole("button", { name: "Payees"})
        expect(payeesButton).toBeInTheDocument()

        fireEvent.click(payeesButton)

        const payeesView = screen.getByTestId("payees-view")
        expect(payeesView).toBeInTheDocument()

        expect(screen.queryByTestId("day-view")).not.toBeInTheDocument()
        expect(screen.queryByTestId("tags-view")).not.toBeInTheDocument()
        
        expect(screen.getByRole("button", { name: "Day"}).className).toContain("bg-gray-300")
        expect(screen.getByRole("button", { name: "Tags"}).className).toContain("bg-gray-300")
        expect(screen.getByRole("button", { name: "Payees"}).className).toContain("bg-indigo-600")
    })
})