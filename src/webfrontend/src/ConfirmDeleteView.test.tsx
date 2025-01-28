import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vitest } from "vitest";
import '@testing-library/jest-dom'
import { ConfirmDeleteView } from "./ConfirmDeleteView";

describe('ConfirmDeleteView', () => {
    it("shows yes and no buttons and heading", () => {
        render(<ConfirmDeleteView  />)

        expect(screen.queryByTestId("confirmDeleteView")).toBeInTheDocument()
        expect(screen.getByRole("heading", { name: "Confirm to delete?"})).toBeInTheDocument()
        expect(screen.getByRole("button", { name: "Yes"})).toBeInTheDocument()
        expect(screen.getByRole("button", { name: "No"})).toBeInTheDocument()
    })

    it("executes onYes callback when yes is clicked", () => {
        const onYes = vitest.fn()
        render(<ConfirmDeleteView  onYes={onYes} />)

        fireEvent.click(screen.getByRole("button", { name: "Yes"}))
        expect(onYes).toHaveBeenCalled()
    })

    it("executes onNo callback when no is clicked", () => {
        const onNo = vitest.fn()
        render(<ConfirmDeleteView  onNo={onNo} />)

        fireEvent.click(screen.getByRole("button", { name: "No"}))
        expect(onNo).toHaveBeenCalled()
    })
})