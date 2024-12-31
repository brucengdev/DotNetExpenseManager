import { render } from "@testing-library/react";
import {describe, it} from 'vitest'
import '@testing-library/jest-dom'
import { DayView } from "../DayView";
import { TestClient } from "./TestClient";

describe("DayView", () => {
    it("gets current expenses", () => {
        const client = new TestClient()
        client.Expenses = [
            { date: new Date(2024, 12, 11), title: "grocery", value: -120 },
            { date: new Date(2024, 12, 8), title: "toys", value: -100 },
            { date: new Date(2024, 12, 9), title: "eat out", value: -60 },
            { date: new Date(2024, 12, 11), title: "eat out", value: -65 },
        ]
        render(<DayView client={client} date={new Date(2024, 12, 11)} />)
        
    })
})