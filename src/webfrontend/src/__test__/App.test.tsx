import { screen, render } from "@testing-library/react";
import App from "../App";
import {describe, expect, it} from 'vitest'
import '@testing-library/jest-dom'

describe("App", () => {
    it("displays a header", () => {
        render(<App />)

        expect(screen.getByRole("heading", { name: "Vite + React"})).toBeInTheDocument()
    })
})