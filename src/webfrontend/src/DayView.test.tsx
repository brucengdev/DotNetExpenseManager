import { fireEvent, render, screen } from "@testing-library/react";
import {describe, expect, it} from 'vitest'
import '@testing-library/jest-dom'
import { DayView } from "./DayView";
import { TestClient } from "./__test__/TestClient";
import { Entry } from "./models/Entry";
import { sameDate } from "./utils";
import { Category } from "./models/Category";
import { Tag } from "./models/Tag";
import { Payee } from "./models/Payee";

describe("DayView", () => {
    it("shows entries by day", async () => {
        const client = new TestClient()
        client.Categories = [
            new Category(1, "household"),
            new Category(2, "leisure"),
        ]
        client.Tags = [
            new Tag(1, "tag1"),
            new Tag(2, "tag2"),
            new Tag(3, "tag3")
        ]
        client.Payees = [
            new Payee(1, "Tom")
        ]
        client.Entries = [
            new Entry(0, new Date(2024, 5, 11), "grocery", -120, 1, [1,3]),
            new Entry(1, new Date(2024, 5, 8), "toys", -100, 1),
            new Entry(2, new Date(2024, 5, 9), "eat out", -60, 2, [2,3]),
            new Entry(3, new Date(2024, 5, 11), "eat out", -65, 2, [], 1, "this is some note"),
        ]
        render(<DayView client={client} initialDate={new Date(2024, 5, 11)} />)
        
        const entryList = await screen.findByTestId("entry-list")
        expect(entryList).toBeInTheDocument()

        const dateField = await screen.findByLabelText("Date")
        expect(dateField).toHaveValue("2024-06-11")
        expect(dateField).toHaveAttribute("type", "date")

        expect(screen.getByRole("button", { name: "<" })).toBeInTheDocument()
        expect(screen.getByRole("button", { name: ">" })).toBeInTheDocument()

        const entries = entryList.querySelectorAll('[data-testid="entry"]')
        expect(entries.length).toBe(2)

        expect(entries[0].querySelector('[data-testid="title"]')?.textContent).toBe("grocery")
        expect(entries[0].querySelector('[data-testid="category"]')?.textContent).toBe("household")
        expect(entries[0].querySelector('[data-testid="value"]')?.textContent).toBe("-120")
        expect(entries[0].querySelector('[data-testid="tags"]')?.textContent).toBe("tag1,tag3")
        expect(entries[0].querySelector('button[data-testid="deleteBtn"]')).toBeInTheDocument()

        expect(entries[1].querySelector('[data-testid="title"]')?.textContent).toBe("eat out")
        expect(entries[1].querySelector('[data-testid="category"]')?.textContent).toBe("leisure")
        expect(entries[1].querySelector('[data-testid="value"]')?.textContent).toBe("-65")
        expect(entries[1].querySelector('[data-testid="tags"]')?.textContent).toBe("")
        expect(entries[1].querySelector('[data-testid="payee"]')?.textContent).toBe("Tom")
        expect(entries[1].querySelector('[data-testid="notes"]')?.textContent).toBe("this is some note")
        expect(entries[1].querySelector('button[data-testid="deleteBtn"]')).toBeInTheDocument()
    })

    it("shows entries by day 2", async () => {
        const client = new TestClient()
        client.Entries = [
            new Entry(0, new Date(2024, 12, 11), "grocery", -120),
            new Entry(1, new Date(2024, 12, 8), "toys", -100),
            new Entry(2, new Date(2024, 12, 9), "eat out", -60),
            new Entry(3, new Date(2024, 12, 11), "eat out", -65),
        ]
        render(<DayView client={client} initialDate={new Date(2023, 12, 11)} />)
        
        const entryList = await screen.findByTestId("entry-list")
        expect(entryList).toBeInTheDocument()

        const entries = entryList.querySelectorAll('[data-testid="entry"]')
        expect(entries.length).toBe(0)
    })

    
    it("switches to previous day when previous day button is clicked", async () => {
        const client = new TestClient()
        client.Entries = [
            new Entry(0, new Date(2024, 4, 31), "grocery", -120),
            new Entry(1, new Date(2024, 4, 31), "toys", -100),
            new Entry(2, new Date(2024, 12, 9), "eat out", -60),
            new Entry(3, new Date(2024, 12, 11), "eat out", -65),
        ]
        render(<DayView client={client} initialDate={new Date(2024, 5, 1)} />)
        
        expect(await screen.findByLabelText("Date")).toHaveValue("2024-06-01")
        fireEvent.click(screen.getByRole("button", {name: "<"}))

        expect(await screen.findByLabelText("Date")).toHaveValue("2024-05-31")

        const entryList = screen.getByTestId("entry-list")
        const entries = entryList.querySelectorAll('[data-testid="entry"]')
        expect(entries.length).toBe(2) 

        expect(entries[0].querySelector('[data-testid="title"]')?.textContent).toBe("grocery")
        expect(entries[0].querySelector('[data-testid="value"]')?.textContent).toBe("-120")

        expect(entries[1].querySelector('[data-testid="title"]')?.textContent).toBe("toys")
        expect(entries[1].querySelector('[data-testid="value"]')?.textContent).toBe("-100")
    })

    it("switches to next day when next day button is clicked", async () => {
        const client = new TestClient()
        client.Entries = [
            new Entry(0, new Date(2024, 5, 1), "grocery", -120),
            new Entry(1, new Date(2024, 5, 1), "toys", -100),
            new Entry(2, new Date(2024, 12, 9), "eat out", -60),
            new Entry(3, new Date(2024, 12, 11), "eat out", -65),
        ]
        render(<DayView client={client} initialDate={new Date(2024, 4, 31)} />)
        
        const dateField = await screen.findByLabelText("Date")
        expect(dateField).toHaveValue("2024-05-31")
        fireEvent.click(screen.getByRole("button", {name: ">"}))
        
        expect(await screen.findByLabelText("Date")).toHaveValue("2024-06-01")

        const entryList = screen.getByTestId("entry-list")
        const entries = entryList.querySelectorAll('[data-testid="entry"]')
        expect(entries.length).toBe(2) 

        expect(entries[0].querySelector('[data-testid="title"]')?.textContent).toBe("grocery")
        expect(entries[0].querySelector('[data-testid="value"]')?.textContent).toBe("-120")

        expect(entries[1].querySelector('[data-testid="title"]')?.textContent).toBe("toys")
        expect(entries[1].querySelector('[data-testid="value"]')?.textContent).toBe("-100")
    })

    it("switches to next day when date field is changed", async () => {
        const client = new TestClient()
        client.Entries = [
            new Entry(0, new Date(2024, 5, 1), "grocery", -120),
            new Entry(1, new Date(2024, 5, 1), "toys", -100),
            new Entry(2, new Date(2024, 12, 9), "eat out", -60),
            new Entry(3, new Date(2024, 12, 11), "eat out", -65),
        ]
        render(<DayView client={client} initialDate={new Date(2024, 4, 2)} />)
        
        const dateField = await screen.findByLabelText("Date")
        expect(dateField).toHaveValue("2024-05-02")

        fireEvent.change(dateField, { target: { value: "2024-06-01"}})
        
        expect(await screen.findByLabelText("Date")).toHaveValue("2024-06-01")

        const entryList = screen.getByTestId("entry-list")
        const entries = entryList.querySelectorAll('[data-testid="entry"]')
        expect(entries.length).toBe(2) 

        expect(entries[0].querySelector('[data-testid="title"]')?.textContent).toBe("grocery")
        expect(entries[0].querySelector('[data-testid="value"]')?.textContent).toBe("-120")

        expect(entries[1].querySelector('[data-testid="title"]')?.textContent).toBe("toys")
        expect(entries[1].querySelector('[data-testid="value"]')?.textContent).toBe("-100")
    })


    it("has button to log new expense", () => {
        render(<DayView client={new TestClient()} initialDate={new Date()} />)

        expect(screen.getByRole("button", {name: "+"})).toBeInTheDocument()
    })

    it("shows form to enter when log button is pressed", () => {
        render(<DayView client={new TestClient()} initialDate={new Date()} />)

        const logButton = screen.getByRole("button", {name: "+"})
        fireEvent.click(logButton)

        expect(screen.getByTestId("entry-form")).toBeInTheDocument()
    })

    it("goes back to day view after saving new entry", async() => {
        const client = new TestClient()
        client.Categories = [
            new Category(12, "Household")
        ]
        render(<DayView client={client} initialDate={new Date(2024, 4, 31)} />)

        const logButton = await screen.findByRole("button", {name: "+"})
        fireEvent.click(logButton)

        fireEvent.click(await screen.findByRole("link", { name: "Uncategorized"}))
        fireEvent.click(screen.getByRole("link", { name: "Household"}))

        fireEvent.change(screen.getByRole("textbox", {name: "Title"}), { target: { value: "foo"}})
        fireEvent.change(screen.getByLabelText("Value"), { target: { value: "-120.23"}})
        fireEvent.change(screen.getByLabelText("Date"), { target: { value: "2023-01-02"}})
        fireEvent.click(screen.getByRole("button", { name: "Save" }))

        expect(await screen.findByTestId("entry-list")).toBeInTheDocument()

        expect(client.Entries.length).toBe(1)
        const entry = client.Entries[0]
        expect(entry.title).toBe("foo")
        expect(entry.value).toBe(-120.23)
        expect(sameDate(entry.date, new Date(2023, 0, 2))).toBeTruthy()
        expect(entry.categoryId).toBe(12)
    })

    it("goes back to day view after cancelling adding new entry", async() => {
        const client = new TestClient()
        render(<DayView client={client} initialDate={new Date(2024, 4, 31)} />)

        fireEvent.click(screen.getByRole("button", {name: "+"}))
        fireEvent.click(screen.getByRole("button", { name: "Cancel" }))

        expect(await screen.findByTestId("entry-list")).toBeInTheDocument()
    })

    it("deletes an entry", async() => {
        const client = new TestClient()
        client.Entries = [
            new Entry(13, new Date(2024, 5, 1), "grocery", -120),
        ]
        render(<DayView client={client} initialDate={new Date(2024, 5, 1)} />)

        const entryList = await screen.findByTestId("entry-list")
        const entries = entryList.querySelectorAll('[data-testid="entry"]')
        expect(entries.length).toBe(1) 

        fireEvent.click(screen.getByRole("button", {name: "X"}))

        fireEvent.click(screen.getByRole("button", {name: "Yes"}))

        expect(client.Entries.length).toBe(0)

        const entryListAfter = await screen.findByTestId("entry-list")
        const entriesAfter = entryListAfter.querySelectorAll('[data-testid="entry"]')
        expect(entriesAfter.length).toBe(0) 
    })
})