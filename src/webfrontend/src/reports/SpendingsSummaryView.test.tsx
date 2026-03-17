import { describe, expect, it, vitest } from "vitest";
import { SpendingsSummaryView } from "./SpendingsSummaryView";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import { TestClient } from "../__test__/TestClient";

describe("SpendingsSummaryView", () => {
    it("renders spendings summary", async () => {
        const client = new TestClient()
        client.GetSpendingsSummary = vitest.fn(async (date:Date) => {
            return {
                amountSpentToday: -123
            }
        })
        render(<SpendingsSummaryView client={client} date={new Date()} />)

        expect(screen.getByTestId("spendings-summary")).toBeInTheDocument()
        expect(await screen.findByTestId("amount-spent-today")).toHaveTextContent("-123")
    })
})