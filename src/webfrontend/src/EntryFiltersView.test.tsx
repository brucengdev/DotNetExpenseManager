import { render, screen, waitFor, within } from "@testing-library/react";
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
            new Category(1, "household") 
        ]
        client.Tags = [
            new Tag(2, "tag2"),
            new Tag(1, "tag1"),
            new Tag(3, "tag3")
        ]
        client.Payees = [
            new Payee(1, "Tom")
        ]
        render(<EntryFiltersView client={client}/>)
        
        const fromDateField = screen.getByLabelText("From date")
        expect(fromDateField).toBeInTheDocument()

        const toDateField = screen.getByLabelText("To date")
        expect(toDateField).toBeInTheDocument()

        const categoryField = screen.getByTestId("category-control")
        expect(categoryField).toBeInTheDocument()

        expect(screen.getByLabelText("Tags")).toBeInTheDocument()
        const tagsField = screen.getByTestId("tags-control")
        expect(tagsField).toBeInTheDocument()

        await waitFor(() => {
            const tagOptions = within(tagsField).getAllByRole("option")
            const tagNames = tagOptions.map(to => to.textContent)
            expect(tagNames).toStrictEqual(["tag1","tag2","tag3"])
        })

        expect(screen.getByRole("combobox", { name: "Payee" })).toBeInTheDocument()
        expect(screen.getByRole("option", { name: "[No payee]"})).toBeInTheDocument()
        expect((screen.getByRole("option", { name: "[No payee]"}) as HTMLOptionElement).selected).toBeTruthy()
        expect(screen.getByRole("option", { name: "Tom"})).toBeInTheDocument()

    })
})