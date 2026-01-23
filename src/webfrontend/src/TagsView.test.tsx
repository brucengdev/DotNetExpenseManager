import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import {describe, expect, it} from 'vitest'
import '@testing-library/jest-dom'
import { TagsView } from "./TagsView";
import { TestClient } from "./__test__/TestClient";
import { Tag } from "./models/Tag";

describe("TagsView", () => {
    it("has necessary ui components", async () => {
        const testClient = new TestClient()
        testClient.Tags = [
            new Tag(1, "Tag 1"),
            new Tag(2, "Tag 2")
        ]
        render(<TagsView client={testClient} />)
        await waitFor(() => {
            const tags = screen.queryAllByTestId("tag")
            expect(tags).toHaveLength(2)
        })

        const tagNames = screen.queryAllByTestId("tag-name").map(t => t.textContent)
        expect(tagNames).toStrictEqual(["Tag 1", "Tag 2"])

        expect(screen.getByRole("button", { name: "+"})).toBeInTheDocument()
        expect(screen.queryByTestId("add-tag-form")).not.toBeInTheDocument()
    })

    it("shows add tag form when add button is clicked", async () => {
        const testClient = new TestClient()
        render(<TagsView client={testClient} />)
        
        fireEvent.click(screen.getByRole("button", { name: "+"}))
        expect(await screen.findByTestId("add-tag-form")).toBeInTheDocument()
    })

    it("hides add tag form when cancel button is clicked", async () => {
        const testClient = new TestClient()
        render(<TagsView client={testClient} />)
        
        fireEvent.click(screen.getByRole("button", { name: "+"}))
        expect(await screen.findByTestId("add-tag-form")).toBeInTheDocument()

        fireEvent.click(screen.getByRole("button", { name: "Cancel"}))
        expect(screen.queryByTestId("add-tag-form")).not.toBeInTheDocument()
    })

    it("creates and shows new tag", async () => {
        const testClient = new TestClient()
        testClient.Tags = [
            new Tag(1, "Existing Tag")
        ]
        render(<TagsView client={testClient} />)

        expect(await screen.findAllByTestId("tag")).toHaveLength(1)
        
        fireEvent.click(screen.getByRole("button", { name: "+"}))

        fireEvent.change(screen.getByLabelText("Tag name"), { target: { value: "New Tag"}})

        expect(screen.getByLabelText("Tag name")).toHaveValue("New Tag")

        fireEvent.click(screen.getByRole("button", { name: "Save"}))

        await waitFor(() => {
            expect(screen.queryByTestId("add-tag-form")).not.toBeInTheDocument()

            expect(screen.getAllByTestId("tag")).toHaveLength(2)

            const tagNames = screen.queryAllByTestId("tag-name").map(t => t.textContent)
            expect(tagNames).toStrictEqual(["Existing Tag", "New Tag"])
        })
    })
})