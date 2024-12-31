import { screen, render } from "@testing-library/react";
import {describe, expect, it} from 'vitest'
import '@testing-library/jest-dom'
import { MainView } from "../MainView";

describe("MainView", () => {
    it("has necessary ui components", () => {
        render(<MainView  />)
        
        expect(screen.getByRole("button", { name: "Today"})).toBeInTheDocument()
    })
})