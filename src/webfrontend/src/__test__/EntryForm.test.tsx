import { render, screen } from "@testing-library/react";
import {describe, expect, it} from 'vitest'
import '@testing-library/jest-dom'
import { EntryForm } from "../EntryForm";

describe("EntryForm", () => {
    it("shows form input", async () => {
        render(<EntryForm date={new Date(2024, 4, 31)} />)
        
        expect(screen.getByRole("textbox", {name: "Title"})).toBeInTheDocument()
        expect(screen.getByLabelText("Value")).toBeInTheDocument()
        
        const dateField = screen.getByLabelText("Date")
        expect(dateField).toBeInTheDocument()
        expect(dateField).toHaveAttribute("value", "2024-05-31")

        expect(screen.getByRole("button", {name: "Save"})).toBeInTheDocument()
    })
})