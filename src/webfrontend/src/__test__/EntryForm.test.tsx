import { render, screen } from "@testing-library/react";
import {describe, expect, it} from 'vitest'
import '@testing-library/jest-dom'
import { EntryForm } from "../EntryForm";

describe("EntryForm", () => {
    it("shows form input", async () => {
        render(<EntryForm  />)
        
        expect(screen.getByRole("textbox", {name: "Title"})).toBeInTheDocument()
        expect(screen.getByLabelText("Value")).toBeInTheDocument()
        expect(screen.getByLabelText("Date")).toBeInTheDocument()
        expect(screen.getByRole("button", {name: "Save"})).toBeInTheDocument()
    })
})