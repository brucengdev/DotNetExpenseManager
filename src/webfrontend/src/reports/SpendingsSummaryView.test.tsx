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
                amountSpentToday: -123,
                amountSpentThisWeek: -222,
                amountSpentThisMonth: -333,
                amountSpentThisYear: -444
            }
        })
        render(<SpendingsSummaryView client={client} date={new Date()} />)

        expect(screen.getByTestId("spendings-summary")).toBeInTheDocument()
        
        expect(screen.getByRole("heading", { name:"Spendings"})).toBeInTheDocument()
        
        expect(await screen.findByTestId("amount-spent-today")).toHaveTextContent("Today: -123")
        expect(await screen.findByTestId("amount-spent-this-week")).toHaveTextContent("This week: -222")
        expect(await screen.findByTestId("amount-spent-this-month")).toHaveTextContent("This month: -333")
        expect(await screen.findByTestId("amount-spent-this-year")).toHaveTextContent("This year: -444")
    })
})