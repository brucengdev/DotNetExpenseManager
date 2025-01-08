import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import '@testing-library/jest-dom'
import { ConfirmDeleteView } from "../ConfirmDeleteView";

describe('ConfirmDeleteView', () => {
    it("shows yes and no buttons and heading", () => {
        render(<ConfirmDeleteView  />)

        expect(screen.queryByTestId("confirmDeleteView")).toBeInTheDocument()
        expect(screen.getByRole("heading", { name: "Confirm to delete?"})).toBeInTheDocument()
        expect(screen.getByRole("button", { name: "Yes"})).toBeInTheDocument()
        expect(screen.getByRole("button", { name: "No"})).toBeInTheDocument()
    })

})