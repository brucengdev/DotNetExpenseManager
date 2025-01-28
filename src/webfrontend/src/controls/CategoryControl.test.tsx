import { describe, it, expect } from "vitest"
import { TestClient } from "../__test__/TestClient"
import { sleep } from "../__test__/testutils"
import { Category } from "../models/Category"
import { render, screen } from "@testing-library/react"
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

        const categoryField = screen.getByRole("combobox", { name: "Category"})
        expect(categoryField).toBeInTheDocument()
        
        var categoryOptions = screen.getAllByTestId("category-option")
        expect(categoryOptions.length).toBe(2)
        expect(categoryOptions[0].innerHTML).toBe("Uncategorized")
        expect(categoryOptions[0]).toHaveAttribute("value", "0")
        expect((categoryOptions[0] as any).selected).toBeTruthy()

        expect(categoryOptions[1].innerHTML).toBe("household")
        expect(categoryOptions[1]).toHaveAttribute("value", "1")
        expect((categoryOptions[1] as any).selected).toBeFalsy()
    })
})