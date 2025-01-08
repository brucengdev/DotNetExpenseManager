import { fireEvent, render, screen } from "@testing-library/react";
import {describe, expect, it, vitest} from 'vitest'
import '@testing-library/jest-dom'
import { EntryForm } from "../EntryForm";
import { TestClient } from "./TestClient";
import { sleep } from "./testutils";

describe("EntryForm", () => {
    it("shows form input", async () => {
        render(<EntryForm client={new TestClient()} date={new Date(2024, 4, 31)} onSave={() => {}} />)
        
        expect(screen.getByRole("textbox", {name: "Title"})).toBeInTheDocument()
        expect(screen.getByLabelText("Value")).toBeInTheDocument()
        
        const dateField = screen.getByLabelText("Date")
        expect(dateField).toBeInTheDocument()
        expect(dateField).toHaveAttribute("value", "2024-05-31")

        expect(screen.getByRole("button", {name: "Save"})).toBeInTheDocument()
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
        expect(saveHandler).toHaveBeenCalled()
    })

    it("hightlights textbox when value is invalid", async () => {
        const saveHandler = vitest.fn()
        const client = new TestClient()
        render(<EntryForm client={client} date={new Date(2024, 4, 31)} onSave={saveHandler} />)
        
        fireEvent.change(screen.getByLabelText("Value"), { target: { value: "-"}})

        expect(screen.getByLabelText("Value")).toHaveClass("invalid")
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
})