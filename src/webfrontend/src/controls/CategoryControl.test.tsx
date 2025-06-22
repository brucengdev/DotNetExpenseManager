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

        expect(screen.getByRole("link", { name: "Uncategorized"})).toBeInTheDocument()

        const categoryFilterField = screen.queryByRole("textbox", { name: "Category"})
        expect(categoryFilterField).not.toBeInTheDocument()

        expect(screen.queryAllByTestId("category-option").length).toBe(0)
    })

    it("shows exact selected category", async () => {
        const client = new TestClient()
        client.Categories = [
            new Category(1, "household") 
        ]
        render(<CategoryControl client={client} 
            categoryId={1} 
            onChange={_ => { }}
            />)
        await sleep(100)

        expect(screen.getByTestId("category-control")).toBeInTheDocument();

        expect(screen.getByRole("link", { name: "household"}))
            .toBeInTheDocument()
    })

    it("shows list of categories when clicked on link", async () => {
        const client = new TestClient()
        client.Categories = [
            new Category(1, "household") 
        ]
        render(<CategoryControl client={client} 
            categoryId={0} 
            onChange={_ => { }}
            />)
        await sleep(100)

        fireEvent.click(screen.getByRole("link", {name: "Uncategorized"}))
        await sleep(10)

        const categoryFilterField = screen.getByRole("textbox", { name: "Category"})
        expect(categoryFilterField).toBeInTheDocument()

        expect(screen.getByRole("link", { name: "Uncategorized"}))
            .toBeInTheDocument()
        expect(screen.getByRole("link", { name: "household"}))
            .toBeInTheDocument()
    })

    it("filters list of categories", async () => {
        const client = new TestClient()
        client.Categories = [
            new Category(1, "household"),
            new Category(2, "travel")
        ]
        render(<CategoryControl client={client} 
            categoryId={0} 
            onChange={_ => { }}
            />)
        await sleep(100)

        fireEvent.click(screen.getByRole("link", {name: "Uncategorized"}))
        await sleep(10)

        const categoryFilterField = screen.getByRole("textbox", { name: "Category"})
        fireEvent.change(categoryFilterField, { target: { value: "tr"}})
        
        expect(screen.queryByRole("link", { name: "Uncategorized"}))
            .not.toBeInTheDocument()
        expect(screen.queryByRole("link", { name: "household"}))
            .not.toBeInTheDocument()
        expect(screen.getByRole("link", { name: "travel"}))
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

        fireEvent.click(screen.getByRole("link", {name: "Uncategorized"}))
        await sleep(10)

        const householdCat = screen.getByRole("link", { name: "household"})
        fireEvent.click(householdCat)

        expect(onChange).toHaveBeenCalled()
        expect(selectedCatId).toBe(1)

        expect(screen.queryByRole("textbox", { name: "Category" }))
            .not.toBeInTheDocument()
    })

    it("shows add category button when filter finds nothing", async () => {
        const client = new TestClient()
        client.Categories = [
            new Category(1, "household") 
        ]
        render(<CategoryControl client={client} 
            categoryId={0} 
            onChange={_ => { }}
            />)
        await sleep(100)

        fireEvent.click(screen.getByRole("link", {name: "Uncategorized"}))
        await sleep(10)

        fireEvent.change(screen.getByRole("textbox", { name: "Category"}),
            {target: { value: "foo" }})

        expect(screen.getByRole("button", { name: "Create new category foo"}))
            .toBeInTheDocument()
    })

    it("adds new category when add button is clicked", async () => {
        const client = new TestClient()
        client.Categories = [
            new Category(1, "household") 
        ]
        render(<CategoryControl client={client} 
            categoryId={0} 
            onChange={_ => { }}
            />)
        await sleep(10)

        fireEvent.click(screen.getByRole("link", {name: "Uncategorized"}))
        fireEvent.change(screen.getByRole("textbox", { name: "Category"}),
            {target: { value: "foo" }})

        fireEvent.click(screen.getByRole("button", { name: "Create new category foo"}))
        
        await sleep(10)

        expect(client.Categories).toContainEqual(new Category(2, "foo"))

        expect(screen.queryByRole("button", { name: "+"})).not.toBeInTheDocument()
    })
})