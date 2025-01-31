import { describe, it, expect, vitest } from "vitest"
import { TestClient } from "../__test__/TestClient"
import { sleep } from "../__test__/testutils"
import { Category } from "../models/Category"
import { fireEvent, render, screen } from "@testing-library/react"
import { CategoryControl } from "./CategoryControl"
import '@testing-library/jest-dom'

describe("CategoryControl", () => {
    it("shows form input", async () => {
        const client = new TestClient()
        client.Categories = [
            new Category(1, "household") 
        ]
        render(<CategoryControl client={client} 
            categoryId={0} 
            onChange={_ => { }}
            />)
        await sleep(100)

        expect(screen.getByTestId("category-control")).toBeInTheDocument();

        const categoryFilterField = screen.getByRole("textbox", { name: "Category"})
        expect(categoryFilterField).toBeInTheDocument()
        expect(categoryFilterField).toHaveAttribute("value", "")
        expect(categoryFilterField).toHaveAttribute("placeholder", "Uncategorized")

        expect(screen.queryByRole("link", { name: "Uncategorized"}))
            .not.toBeInTheDocument()
        expect(screen.queryByRole("link", { name: "household"}))
            .not.toBeInTheDocument()
    })

    it("shows list of categories on focus", async () => {
        const client = new TestClient()
        client.Categories = [
            new Category(1, "household") 
        ]
        render(<CategoryControl client={client} 
            categoryId={0} 
            onChange={_ => { }}
            />)
        await sleep(100)

        const categoryFilterField = screen.getByRole("textbox", { name: "Category"})

        fireEvent.focus(categoryFilterField);

        expect(screen.getByRole("link", { name: "Uncategorized"}))
            .toBeInTheDocument()
        expect(screen.getByRole("link", { name: "household"}))
            .toBeInTheDocument()
    })

    it("selects a category when clicked", async () => {
        const client = new TestClient()
        client.Categories = [
            new Category(1, "household") 
        ]
        let selectedCatId: number | undefined = undefined
        const onChange = vitest.fn((catId: number) => {
            selectedCatId = catId
        })
        render(<CategoryControl client={client} 
            categoryId={0} 
            onChange={onChange}
            />)
        await sleep(100)

        const categoryFilterField = screen.getByRole("textbox", { name: "Category"})

        fireEvent.focus(categoryFilterField);

        const householdCat = screen.getByRole("link", { name: "household"})
        fireEvent.click(householdCat)

        expect(onChange).toHaveBeenCalled()
        expect(selectedCatId).toBe(1)
    })
})