import { fireEvent, render, screen } from "@testing-library/react";
import {describe, expect, it, vitest} from 'vitest'
import '@testing-library/jest-dom'
import { EntryForm } from "./EntryForm";
import { TestClient } from "./__test__/TestClient";
import { sleep } from "./__test__/testutils";
import { Category } from "./models/Category";

describe("EntryForm", () => {
    it("shows form input", async () => {
        const client = new TestClient()
        client.Categories = [
            new Category(1, "household") 
        ]
        render(<EntryForm client={client} date={new Date(2024, 4, 31)} onSave={() => {}} />)
        await sleep(100)

        expect(screen.getByRole("textbox", {name: "Title"})).toBeInTheDocument()
        expect(screen.getByLabelText("Value")).toBeInTheDocument()
        
        const dateField = screen.getByLabelText("Date")
        expect(dateField).toBeInTheDocument()
        expect(dateField).toHaveAttribute("value", "2024-05-31")

        const categoryField = screen.getByTestId("category-control")
        expect(categoryField).toBeInTheDocument()

        expect(screen.getByRole("button", {name: "Save"})).toBeInTheDocument()
        expect(screen.getByRole("button", {name: "Cancel"})).toBeInTheDocument()
    })

    it("changes date", async () => {
        render(<EntryForm client={new TestClient()} date={new Date(2024, 4, 31)} onSave={() => {}} />)
        
        const dateField = screen.getByLabelText("Date")
        expect(dateField).toHaveAttribute("value", "2024-05-31")

        fireEvent.change(dateField, { target: { value: "2023-01-02"}})
        expect(dateField).toHaveAttribute("value", "2023-01-02")
    })

    it("changes title", async () => {
        render(<EntryForm client={new TestClient()} date={new Date(2024, 4, 31)} onSave={() => {}} />)
        
        const titleTextbox = screen.getByRole("textbox", {name: "Title"})
        expect(titleTextbox).toHaveAttribute("value", "")

        fireEvent.change(titleTextbox, { target: { value: "foo"}})
        expect(titleTextbox).toHaveAttribute("value", "foo")
    })

    it("changes value", async () => {
        render(<EntryForm client={new TestClient()} date={new Date(2024, 4, 31)} onSave={() => {}} />)
        
        const valueTextbox = screen.getByLabelText("Value")
        expect(valueTextbox).toHaveAttribute("value", "0")

        fireEvent.change(valueTextbox, { target: { value: "-120.23"}})
        expect(valueTextbox).toHaveAttribute("value", "-120.23")
    })

    it("changes category", async () => {
        const client = new TestClient()
        client.Categories = [
            new Category(1, "household") 
        ]
        render(<EntryForm client={client} date={new Date(2024, 4, 31)} onSave={() => {}} />)
        await sleep(10)
        
        fireEvent.click(screen.getByRole("link", { name: "Uncategorized" }))
        fireEvent.click(screen.getByRole("link", { name: "household" }))
        await sleep(10)
        
        expect(screen.getByRole("link", { name: "household"}))
            .toBeInTheDocument()
    })

    it("saves entries and executes callback when clicking save successfully", async () => {
        const saveHandler = vitest.fn()
        const client = new TestClient()
        render(<EntryForm client={client} date={new Date(2024, 4, 31)} onSave={saveHandler} />)
        
        fireEvent.change(screen.getByRole("textbox", {name: "Title"}), { target: { value: "foo"}})
        fireEvent.change(screen.getByLabelText("Value"), { target: { value: "-120.23"}})
        fireEvent.change(screen.getByLabelText("Date"), { target: { value: "2023-01-02"}})
        fireEvent.click(screen.getByRole("button", { name: "Save" }))

        await sleep(10)

        expect(client.Entries.length).toBe(1)
        expect(client.Entries[0].categoryId).toBeUndefined()
        expect(saveHandler).toHaveBeenCalled()
    })

    it("hightlights textbox when value is invalid", async () => {
        const saveHandler = vitest.fn()
        const client = new TestClient()
        render(<EntryForm client={client} date={new Date(2024, 4, 31)} onSave={saveHandler} />)
        
        fireEvent.change(screen.getByLabelText("Value"), { target: { value: "-"}})

        expect(screen.getByLabelText("Value")).toHaveClass("border-red-600")
    })

    it("does not save entry if form is invalid", async () => {
        const saveHandler = vitest.fn()
        const client = new TestClient()
        render(<EntryForm client={client} date={new Date(2024, 4, 31)} onSave={saveHandler} />)
        
        fireEvent.change(screen.getByRole("textbox", {name: "Title"}), { target: { value: "foo"}})
        fireEvent.change(screen.getByLabelText("Date"), { target: { value: "2023-01-02"}})
        fireEvent.change(screen.getByLabelText("Value"), { target: { value: "-"}})
        fireEvent.click(screen.getByRole("button", { name: "Save" }))

        await sleep(10)

        expect(saveHandler).not.toHaveBeenCalled()
    })

    it("calls onCancel when Cancel is clicked", async () => {
        const saveHandler = vitest.fn()
        const cancelHandler = vitest.fn()
        const client = new TestClient()
        render(<EntryForm client={client} date={new Date(2024, 4, 31)} onSave={saveHandler} onCancel={cancelHandler} />)
        
        fireEvent.click(screen.getByRole("button", { name: "Cancel" }))

        expect(saveHandler).not.toHaveBeenCalled()
        expect(cancelHandler).toHaveBeenCalled()
    })
})