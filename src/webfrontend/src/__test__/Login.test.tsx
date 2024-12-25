import { screen, render, fireEvent } from "@testing-library/react";
import {describe, expect, it} from 'vitest'
import '@testing-library/jest-dom'
import { Login } from "../Login";

describe("Login", () => {
    it("has necessary ui components", () => {
        render(<Login />)

        expect(screen.getByRole("heading", { name: "Login"})).toBeInTheDocument()
        expect(screen.getByRole("textbox", { name: "Username"})).toBeInTheDocument()
        expect(screen.getByRole("textbox", { name: "Username"}).className).toBe("")
        expect(screen.getByLabelText("Password")).toBeInTheDocument()
        expect(screen.getByRole("button", { name: "Login"})).toBeInTheDocument()
    })

    it("has mandatory field checks 1", async () => {
        render(<Login />)

        fireEvent.click(screen.getByRole("button", { name: "Login"}))

        expect(screen.getByRole("textbox", { name: "Username" }).className).toContain("mandatory")
        expect(screen.getByLabelText("Password").className).toContain("mandatory")

        fireEvent.change(screen.getByRole("textbox", { name: "Username"}), { target: { value: "123"}})
        fireEvent.change(screen.getByLabelText("Password"), { target: { value: "123"}})

        fireEvent.click(screen.getByRole("button", { name: "Login"}))

        expect(screen.getByRole("textbox", { name: "Username" }).className).toBe("")
        expect(screen.getByLabelText("Password").className).toBe("")
    })

    it("has mandatory field checks 2", async () => {
        render(<Login />)

        fireEvent.change(screen.getByRole("textbox", { name: "Username"}), { target: { value: "123"}})

        fireEvent.click(screen.getByRole("button", { name: "Login"}))

        expect(screen.getByRole("textbox", { name: "Username" }).className).toBe("")
        expect(screen.getByLabelText("Password").className).toContain("mandatory")
    })

    it("has mandatory field checks 3", async () => {
        render(<Login />)

        fireEvent.change(screen.getByRole("textbox", { name: "Username"}), { target: { value: "123"}})
        fireEvent.change(screen.getByLabelText("Password"), { target: { value: "123"}})

        fireEvent.click(screen.getByRole("button", { name: "Login"}))

        expect(screen.getByRole("textbox", { name: "Username" }).className).toBe("")
        expect(screen.getByLabelText("Password").className).toBe("")
    })
})