import { screen, render } from "@testing-library/react";
import {describe, expect, it} from 'vitest'
import '@testing-library/jest-dom'
import { TagsView } from "./TagsView";
import { TestClient } from "./__test__/TestClient";

describe("TagsView", () => {
    it("has necessary ui components", () => {
        const testClient = new TestClient()
        render(<TagsView client={testClient} />)
        expect(screen.queryAllByTestId("tag")).toHaveLength(2)
        expect(screen.getByRole("button", { name: "+"})).toBeInTheDocument()
    })
})