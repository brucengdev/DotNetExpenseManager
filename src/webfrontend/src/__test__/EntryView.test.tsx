import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EntryView } from "../EntryView";
import '@testing-library/jest-dom'

describe('EntryView', () => {
    it("shows delete button", () => {
        render(<EntryView title="Foo" value={-12}  />)

        expect(screen.getByRole("button", {name: "X"})).toBeInTheDocument()
    })
})