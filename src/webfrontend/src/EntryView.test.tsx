import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vitest } from "vitest";
import { EntryView } from "./EntryView";
import '@testing-library/jest-dom'

describe('EntryView', () => {
    it("shows delete button when there is delete callback", () => {
        const onDelete = vitest.fn()
        render(<EntryView title="Foo" categoryName="Cat1" value={-12} onDelete={onDelete} />)

        expect(screen.getByRole("button", {name: "X"})).toBeInTheDocument()
        expect(screen.queryByTestId("confirmDeleteView")).not.toBeInTheDocument()
    })

    it("does not show delete button when there is no delete callback", () => {
        render(<EntryView title="Foo" categoryName="Cat1" value={-12} />)

        expect(screen.queryByRole("button", {name: "X"})).not.toBeInTheDocument()
        expect(screen.queryByTestId("confirmDeleteView")).not.toBeInTheDocument()
    })

    it("shows confirmation dialog when delete is clicked", () => {
        const onDelete = vitest.fn()
        render(<EntryView title="Foo" categoryName="Cat1" value={-12} onDelete={onDelete} />)

        fireEvent.click(screen.getByRole("button", {name: "X"}))
        expect(screen.queryByTestId("confirmDeleteView")).toBeInTheDocument()
    })

    it("executes onDelete when Yes is clicked", () => {
        const onDelete = vitest.fn()
        render(<EntryView title="Foo" categoryName="Cat1" value={-12} onDelete={onDelete} />)

        fireEvent.click(screen.getByRole("button", {name: "X"}))
        expect(screen.queryByTestId("confirmDeleteView")).toBeInTheDocument()
        
        fireEvent.click(screen.getByRole("button", { name: "Yes"}))
        expect(onDelete).toHaveBeenCalled()
        expect(screen.queryByTestId("confirmDeleteView")).not.toBeInTheDocument()
    })
    
    it("hides confirmation view when No is clicked", () => {
        const onDelete = vitest.fn()
        render(<EntryView title="Foo" categoryName="Cat1" value={-12} onDelete={onDelete} />)

        fireEvent.click(screen.getByRole("button", {name: "X"}))
        expect(screen.queryByTestId("confirmDeleteView")).toBeInTheDocument()

        fireEvent.click(screen.getByRole("button", { name: "No"}))
        expect(onDelete).not.toHaveBeenCalled()
        expect(screen.queryByTestId("confirmDeleteView")).not.toBeInTheDocument()
    })
})