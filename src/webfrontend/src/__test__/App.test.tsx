import { screen, render } from "@testing-library/react";
import App from "../App";
import {describe, expect, it} from 'vitest'
import '@testing-library/jest-dom'

describe("App", () => {
    it("shows login form when not logged in", () => {
        render(<App />)

        expect(screen.getByRole("heading", { name: "Login"})).toBeInTheDocument()
    })
})