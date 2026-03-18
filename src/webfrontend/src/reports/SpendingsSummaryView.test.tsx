import { describe, expect, it, vitest } from "vitest";
import { SpendingsSummaryView } from "./SpendingsSummaryView";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import { TestClient } from "../__test__/TestClient";

describe("SpendingsSummaryView", () => {
    it("renders spendings summary", async () => {
        const client = new TestClient()
        client.GetSpendingsSummary = vitest.fn(async (_:Date) => {
            return {
                amountSpentToday: -1230,
                amountSpentThisWeek: -2220,
                amountSpentThisMonth: -3330,
                amountSpentThisYear: -4440
            }
        })
        render(<SpendingsSummaryView client={client} date={new Date()} />)

        expect(screen.getByTestId("spendings-summary")).toBeInTheDocument()
        
        expect(screen.getByRole("heading", { name:"Spendings"})).toBeInTheDocument()
        
        expect((await screen.findByTestId("amount-spent-today")).textContent).toBe("Today: -1.230 ₫")
        expect((await screen.findByTestId("amount-spent-this-week")).textContent).toBe("This week: -2.220 ₫")
        expect((await screen.findByTestId("amount-spent-this-month")).textContent).toBe("This month: -3.330 ₫")
        expect((await screen.findByTestId("amount-spent-this-year")).textContent).toBe("This year: -4.440 ₫")
    })
})