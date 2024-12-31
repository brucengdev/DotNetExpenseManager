import { render, screen } from "@testing-library/react";
import {describe, expect, it} from 'vitest'
import '@testing-library/jest-dom'
import { DayView } from "../DayView";
import { TestClient } from "./TestClient";
import { sleep } from "./testutils";
import { Expense } from "../api/Expense";

describe("DayView", () => {
    it("shows expenses by day", async () => {
        const client = new TestClient()
        client.Expenses = [
            new Expense(new Date(2024, 12, 11), "grocery", -120),
            new Expense(new Date(2024, 12, 8), "toys", -100),
            new Expense(new Date(2024, 12, 9), "eat out", -60),
            new Expense(new Date(2024, 12, 11), "eat out", -65),
        ]
        render(<DayView client={client} date={new Date(2024, 12, 11)} />)
        
        await sleep(10)

        const entries = screen.getAllByTestId("entry")
        expect(entries.length).toBe(2)

        expect(entries[0].querySelector('[data-testid="title"]')?.textContent).toBe("grocery")
        expect(entries[0].querySelector('[data-testid="value"]')?.textContent).toBe("-120")

        expect(entries[1].querySelector('[data-testid="title"]')?.textContent).toBe("eat out")
        expect(entries[1].querySelector('[data-testid="value"]')?.textContent).toBe("-65")
    })

    it("shows expenses by day 2", async () => {
        const client = new TestClient()
        client.Expenses = [
            new Expense(new Date(2024, 12, 11), "grocery", -120),
            new Expense(new Date(2024, 12, 8), "toys", -100),
            new Expense(new Date(2024, 12, 9), "eat out", -60),
            new Expense(new Date(2024, 12, 11), "eat out", -65),
        ]
        render(<DayView client={client} date={new Date(2023, 12, 11)} />)
        
        await sleep(10)

        const entries = screen.queryAllByTestId("entry")
        expect(entries.length).toBe(0)
    })

    it("has button to log new expense", () => {
        render(<DayView client={new TestClient()} date={new Date()} />)

        expect(screen.getByRole("button", {name: "+"})).toBeInTheDocument()
    })
})