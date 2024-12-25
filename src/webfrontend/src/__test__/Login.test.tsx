import { screen, render } from "@testing-library/react";
import {describe, expect, it} from 'vitest'
import '@testing-library/jest-dom'
import { Login } from "../Login";
import { userEvent } from "@testing-library/user-event";

describe("Login", () => {
    it("has necessary ui components", () => {
        render(<Login />)

        expect(screen.getByRole("heading", { name: "Login"})).toBeInTheDocument()
        expect(screen.getByRole("textbox", { name: "Username"})).toBeInTheDocument()
        expect(screen.getByLabelText("Password")).toBeInTheDocument()
        expect(screen.getByRole("button", { name: "Login"})).toBeInTheDocument()
    })

    it("has compulsory username", () => {
        render(<Login />)

        userEvent.click(screen.getByRole("button", { name: "Login"}))

        expect(screen.getByRole("textbox", { name: "Username" }).className).toContain("mandatory")
    })
})