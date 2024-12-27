import { screen, render, fireEvent } from "@testing-library/react";
import App from "../App";
import {describe, expect, it} from 'vitest'
import '@testing-library/jest-dom'
import { TEST_PASSWORD, TEST_USER_NAME, TestClient } from "./TestClient";
import { sleep } from "./testutils";

describe("App", () => {
    it("shows login form when not logged in", () => {
        const client = new TestClient()
        render(<App client={client} />)

        expect(screen.getByRole("heading", { name: "Login"})).toBeInTheDocument()
    })

    it("shows main view when already logged in", async () => {
        const client = new TestClient();
        client.Login(TEST_USER_NAME, TEST_PASSWORD)
        render(<App client={client} />)

        await sleep(10)

        expect(screen.getByRole("heading", { name: "Expenses"})).toBeInTheDocument()
    })

    it("shows main view after logging in", async () => {
        const client = new TestClient()
        render(<App client={client} />)
        
        await sleep(10)

        expect(screen.getByRole("heading", { name: "Login"})).toBeInTheDocument()

        fireEvent.change(screen.getByRole("textbox", { name: "Username"}), { target: { value: TEST_USER_NAME}})
        fireEvent.change(screen.getByLabelText("Password"), { target: { value: TEST_PASSWORD}})

        fireEvent.click(screen.getByRole("button", { name: "Login"}))
        await sleep(10)

        expect(screen.getByRole("heading", { name: "Expenses"})).toBeInTheDocument()
    })

    it("still shows login form if logging in was failed", async () => {
        const client = new TestClient()
        render(<App client={client} />)
        
        await sleep(10)

        expect(screen.getByRole("heading", { name: "Login"})).toBeInTheDocument()

        fireEvent.change(screen.getByRole("textbox", { name: "Username"}), { target: { value: "incorrect_user"}})
        fireEvent.change(screen.getByLabelText("Password"), { target: { value: "incorrect_pass"}})

        fireEvent.click(screen.getByRole("button", { name: "Login"}))
        await sleep(10)

        expect(screen.getByRole("heading", { name: "Login"})).toBeInTheDocument()
    })
})