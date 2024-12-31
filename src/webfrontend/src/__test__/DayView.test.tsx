import { render, screen } from "@testing-library/react";
import {describe, expect, it} from 'vitest'
import '@testing-library/jest-dom'
import { DayView } from "../DayView";
import { TestClient } from "./TestClient";
import { sleep } from "./testutils";

describe("DayView", () => {
    it("gets current expenses", async () => {
        const client = new TestClient()
        client.Expenses = [
            { date: new Date(2024, 12, 11), title: "grocery", value: -120 },
            { date: new Date(2024, 12, 8), title: "toys", value: -100 },
            { date: new Date(2024, 12, 9), title: "eat out", value: -60 },
            { date: new Date(2024, 12, 11), title: "eat out", value: -65 },
        ]
        render(<DayView client={client} date={new Date(2024, 12, 11)} />)
        
        await sleep(10)

        const entries = screen.getAllByTestId("entry")
        expect(entries.length).toBe(2)
    })
})