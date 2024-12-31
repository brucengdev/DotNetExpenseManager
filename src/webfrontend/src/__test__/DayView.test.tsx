import { fireEvent, render, screen } from "@testing-library/react";
import {describe, expect, it} from 'vitest'
import '@testing-library/jest-dom'
import { DayView } from "../DayView";
import { TestClient } from "./TestClient";
import { sleep } from "./testutils";
import { Entry } from "../api/Entry";

describe("DayView", () => {
    it("shows entries by day", async () => {
        const client = new TestClient()
        client.Entries = [
            new Entry(new Date(2024, 12, 11), "grocery", -120),
            new Entry(new Date(2024, 12, 8), "toys", -100),
            new Entry(new Date(2024, 12, 9), "eat out", -60),
            new Entry(new Date(2024, 12, 11), "eat out", -65),
        ]
        render(<DayView client={client} date={new Date(2024, 12, 11)} />)
        
        await sleep(10)

        const entryList = screen.getByTestId("entry-list")
        expect(entryList).toBeInTheDocument()

        const entries = entryList.querySelectorAll('[data-testid="entry"]')
        expect(entries.length).toBe(2)

        expect(entries[0].querySelector('[data-testid="title"]')?.textContent).toBe("grocery")
        expect(entries[0].querySelector('[data-testid="value"]')?.textContent).toBe("-120")

        expect(entries[1].querySelector('[data-testid="title"]')?.textContent).toBe("eat out")
        expect(entries[1].querySelector('[data-testid="value"]')?.textContent).toBe("-65")
    })

    it("shows entries by day 2", async () => {
        const client = new TestClient()
        client.Entries = [
            new Entry(new Date(2024, 12, 11), "grocery", -120),
            new Entry(new Date(2024, 12, 8), "toys", -100),
            new Entry(new Date(2024, 12, 9), "eat out", -60),
            new Entry(new Date(2024, 12, 11), "eat out", -65),
        ]
        render(<DayView client={client} date={new Date(2023, 12, 11)} />)
        
        await sleep(10)

        const entryList = screen.getByTestId("entry-list")
        expect(entryList).toBeInTheDocument()

        const entries = entryList.querySelectorAll('[data-testid="entry"]')
        expect(entries.length).toBe(0)
    })

    it("has button to log new expense", () => {
        render(<DayView client={new TestClient()} date={new Date()} />)

        expect(screen.getByRole("button", {name: "+"})).toBeInTheDocument()
    })

    it("shows form to enter when log button is pressed", () => {
        render(<DayView client={new TestClient()} date={new Date()} />)

        const logButton = screen.getByRole("button", {name: "+"})
        fireEvent.click(logButton)

        expect(screen.getByTestId("entry-form")).toBeInTheDocument()
    })

    it("goes back to day view after saving new entry", async() => {
        const client = new TestClient()
        render(<DayView client={client} date={new Date(2024, 4, 31)} />)

        const logButton = screen.getByRole("button", {name: "+"})
        fireEvent.click(logButton)

        fireEvent.change(screen.getByRole("textbox", {name: "Title"}), { target: { value: "foo"}})
        fireEvent.change(screen.getByLabelText("Value"), { target: { value: "-120.23"}})
        fireEvent.change(screen.getByLabelText("Date"), { target: { value: "2023-01-02"}})
        fireEvent.click(screen.getByRole("button", { name: "Save" }))

        await sleep(10)

        expect(screen.getByTestId("entry-list")).toBeInTheDocument()
    })
})