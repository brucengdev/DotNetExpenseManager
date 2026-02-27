import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import {describe, expect, it, vitest} from 'vitest'
import '@testing-library/jest-dom'
import { EntryForm } from "./EntryForm";
import { TestClient } from "./__test__/TestClient";
import { Category } from "./models/Category";
import { Tag } from "./models/Tag";
import { Payee } from "./models/Payee";

describe("EntryForm", () => {
    it("shows form input", async () => {
        const client = new TestClient()
        client.Categories = [
            new Category(1, "household") 
        ]
        client.Tags = [
            new Tag(1, "tag1")
        ]
        client.Payees = [
            new Payee(1, "Tom")
        ]
        render(<EntryForm client={client} date={new Date(2024, 4, 31)} onSave={() => {}} />)

        expect(await screen.findByRole("textbox", {name: "Title"})).toBeInTheDocument()
        expect(await screen.findByLabelText("Value")).toBeInTheDocument()
        
        const dateField = await screen.findByLabelText("Date")
        expect(dateField).toBeInTheDocument()
        expect(dateField).toHaveAttribute("value", "2024-05-31")

        const categoryField = screen.getByTestId("category-control")
        expect(categoryField).toBeInTheDocument()

        expect(screen.getByLabelText("Tags")).toBeInTheDocument()
        const tagsField = screen.getByTestId("tags-control")
        expect(tagsField).toBeInTheDocument()
        expect(screen.getByRole("option", { name: "tag1"})).toBeInTheDocument()

        expect(screen.getByLabelText("Payee")).toBeInTheDocument()
        expect(screen.getByRole("option", { name: "[No payee]"})).toBeInTheDocument()
        expect((screen.getByRole("option", { name: "[No payee]"}) as HTMLOptionElement).selected).toBeTruthy()
        expect(screen.getByRole("option", { name: "Tom"})).toBeInTheDocument()

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
        
        fireEvent.click(await screen.findByRole("link", { name: "Uncategorized" }))
        fireEvent.click(await screen.findByRole("link", { name: "household" }))
        
        expect(await screen.findByRole("link", { name: "household"}))
            .toBeInTheDocument()
    })

    it("changes tags", async () => {
        const client = new TestClient()
        client.Tags = [
            new Tag(1, "tag1"),
            new Tag(2, "tag2"),
            new Tag(3, "tag3")
        ]
        render(<EntryForm client={client} date={new Date(2024, 4, 31)} onSave={() => {}} />)

        userEvent.selectOptions(await screen.findByTestId("tags-control"), ["1", "2"])

        await waitFor(() => {
            expect((screen.getByRole("option", { name: "tag1"}) as HTMLOptionElement).selected).toBeTruthy()
            expect((screen.getByRole("option", { name: "tag2"}) as HTMLOptionElement).selected).toBeTruthy()
            expect((screen.getByRole("option", { name: "tag3"}) as HTMLOptionElement).selected).toBeFalsy()
        })
    })

    it("changes payee", async () => {
        const client = new TestClient()
        client.Payees = [
            new Payee(1, "Tom")
        ]
        render(<EntryForm client={client} date={new Date(2024, 4, 31)} onSave={() => {}} />)

        userEvent.selectOptions(await screen.findByLabelText("Payee"), "1")
        
        await waitFor(() => {
            expect((screen.getByRole("option", { name: "Tom"}) as HTMLOptionElement).selected).toBeTruthy()
        })
    })

    it("saves entries and executes callback when clicking save successfully", async () => {
        const saveHandler = vitest.fn()
        const client = new TestClient()
        client.Categories = [
            new Category(2, "household") 
        ]
        client.Tags = [
            new Tag(1, "tag1"),
            new Tag(2, "tag2"),
            new Tag(3, "tag3")
        ]
        render(<EntryForm client={client} date={new Date(2024, 4, 31)} onSave={saveHandler} />)
        
        fireEvent.change(await screen.findByRole("textbox", {name: "Title"}), { target: { value: "foo"}})
        fireEvent.change(await screen.findByLabelText("Value"), { target: { value: "-120.23"}})
        fireEvent.change(await screen.findByLabelText("Date"), { target: { value: "2023-01-02"}})
        fireEvent.click(await screen.findByRole("link", { name: "Uncategorized" }))
        fireEvent.click(await screen.findByRole("link", { name: "household" }))
        userEvent.selectOptions(await screen.findByTestId("tags-control"), ["1", "2"])
        fireEvent.click(await screen.findByRole("button", { name: "Save" }))

        expect(client.Entries.length).toBe(1)
        expect(client.Entries[0].title).toBe("foo")
        expect(client.Entries[0].value).toBe(-120.23)
        expect(client.Entries[0].date.toISOString().substring(0,10)).toBe("2023-01-02")
        expect(client.Entries[0].categoryId).toBe(2)
        expect(client.Entries[0].tagIds).toEqual([1,2])
        
        await waitFor(() => expect(saveHandler).toHaveBeenCalled())
    })

    it("saves uncategorized entries", async () => {
        const saveHandler = vitest.fn()
        const client = new TestClient()
        client.Categories = [
            new Category(1, "Uncategorized"),
            new Category(2, "household") 
        ]
        client.Tags = [
            new Tag(1, "tag1"),
            new Tag(2, "tag2"),
            new Tag(3, "tag3")
        ]
        render(<EntryForm client={client} date={new Date(2024, 4, 31)} onSave={saveHandler} />)
        
        fireEvent.click(await screen.findByRole("button", { name: "Save" }))

        expect(client.Entries.length).toBe(1)
        expect(client.Entries[0].categoryId).toBe(1)
        
        await waitFor(() => expect(saveHandler).toHaveBeenCalled())
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