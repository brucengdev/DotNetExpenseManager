import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EntryFiltersView } from "./EntryFiltersView";
import "@testing-library/jest-dom"
import { TestClient } from "./__test__/TestClient";
import { Category } from "./models/Category";
import { Payee } from "./models/Payee";
import { Tag } from "./models/Tag";

describe("EntryFiltersView", () => {
    it("has necessary UI", async () => {
        const client = new TestClient()
        client.Categories = [
            new Category(1, "Uncategorized"),
            new Category(2, "household"),
            new Category(3, "food"),
            new Category(4, "utilities")
        ]
        client.Tags = [
            new Tag(2, "tag2"),
            new Tag(1, "tag1"),
            new Tag(3, "tag3")
        ]
        client.Payees = [
            new Payee(1, "Tom"),
            new Payee(2, "Jane")
        ]
        render(<EntryFiltersView client={client}/>)
        
        const fromDateField = screen.getByLabelText("From date")
        expect(fromDateField).toBeInTheDocument()
        expect(fromDateField).toHaveValue("")

        const toDateField = screen.getByLabelText("To date")
        expect(toDateField).toBeInTheDocument()
        expect(toDateField).toHaveValue("")

        const categoryField = screen.getByLabelText("Categories")
        expect(categoryField).toBeInTheDocument()
        await waitFor(() => {
            const categoryOptions = within(categoryField).getAllByRole("option")
            categoryOptions.forEach(co => expect(co).not.toBeChecked())
            const categoryNames = categoryOptions.map(co => co.textContent)
            expect(categoryNames).toStrictEqual(["Uncategorized", "food", "household", "utilities"])
        })

        expect(screen.getByLabelText("Tags")).toBeInTheDocument()
        const tagsField = screen.getByTestId("tags-control")
        expect(tagsField).toBeInTheDocument()

        await waitFor(() => {
            const tagOptions = within(tagsField).getAllByRole("option")
            tagOptions.forEach(to => expect(to).not.toBeChecked())
            const tagNames = tagOptions.map(to => to.textContent)
            expect(tagNames).toStrictEqual(["tag1","tag2","tag3"])
        })

        const payeeField = screen.getByRole("combobox", { name: "Payee" })
        expect(payeeField).toBeInTheDocument()

        await waitFor(() => {
            const payeeOptions = within(payeeField).getAllByRole("option")
            payeeOptions.forEach(po => expect(po).not.toBeChecked())
            const payeeNames = payeeOptions.map(to => to.textContent)
            //payees must be sorted
            expect(payeeNames).toStrictEqual(["[No payee]","Jane","Tom"])
        })
    })

    it("updates date filters", () => {
        const client = new TestClient()
        render(<EntryFiltersView client={client}/>)

        const fromDateField = screen.getByLabelText("From date")
        fireEvent.change(fromDateField, { target: { value: "2022-02-22"}})
        expect(fromDateField).toHaveValue("2022-02-22")

        const toDateField = screen.getByLabelText("To date")
        fireEvent.change(toDateField, { target: { value: "2022-02-22"}})
        expect(toDateField).toHaveValue("2022-02-22")
    })
})