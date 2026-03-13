import { describe, expect, it } from "vitest"
import { ReportsView } from "./ReportsView"
import { TestClient } from "../__test__/TestClient"
import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'

describe("ReportsView", () => {
    it("has necessary ui components", async () => {
        await render(<ReportsView client={new TestClient()} />)

        expect(screen.getByTestId("reports-view")).toBeInTheDocument()
    })
})