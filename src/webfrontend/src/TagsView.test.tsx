import { screen, render } from "@testing-library/react";
import {describe, expect, it} from 'vitest'
import '@testing-library/jest-dom'
import { TagsView } from "./TagsView";

describe("TagsView", () => {
    it("has necessary ui components", () => {
        render(<TagsView />)
        expect(screen.queryAllByTestId("tag")).toHaveLength(2)
        expect(screen.getByRole("button", { name: "+"})).toBeInTheDocument()
    })
})