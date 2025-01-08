import { render, screen } from "@testing-library/react";
import { describe, expect, it, vitest } from "vitest";
import { EntryView } from "../EntryView";
import '@testing-library/jest-dom'

describe('EntryView', () => {
    it("shows delete button when there is delete callback", () => {
        const onDelete = vitest.fn()
        render(<EntryView title="Foo" value={-12} onDelete={onDelete} />)

        expect(screen.getByRole("button", {name: "X"})).toBeInTheDocument()
    })
})