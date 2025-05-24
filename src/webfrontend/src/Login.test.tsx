import { screen, render, fireEvent } from "@testing-library/react";
import {describe, expect, it, vitest} from 'vitest'
import '@testing-library/jest-dom'
import { Login } from "./Login";
import { TEST_PASSWORD, TEST_TOKEN, TEST_USER_NAME, TestClient } from "./__test__/TestClient";
import { sleep } from "./__test__/testutils";
import { TestStorage } from "./__test__/TestStorage";
import { STORED_TOKEN } from "./storage/Storage";

describe("Login", () => {
    it("has necessary ui components", () => {
        render(<Login client={new TestClient()} storage={new TestStorage()} onLogin={()=> {}} />)

        expect(screen.getByTestId("login-view")).toBeInTheDocument()
        expect(screen.getByRole("textbox", { name: "Username"})).toBeInTheDocument()
        expect(screen.getByRole("textbox", { name: "Username"}).className).not.toContain("border-red-600")
        expect(screen.getByLabelText("Password")).toBeInTheDocument()
        expect(screen.getByRole("button", { name: "Login"})).toBeInTheDocument()
    })

    it("has mandatory field checks 1", async () => {
        const client = new TestClient();
        client.Login = vitest.fn(async () => false)
        const onLogin = vitest.fn()
        render(<Login client={client} storage={new TestStorage()} onLogin={onLogin} />)

        fireEvent.click(screen.getByRole("button", { name: "Login"}))


        expect(screen.getByRole("textbox", { name: "Username" }).className).toContain("border-red-600")
        expect(screen.getByLabelText("Password").className).toContain("border-red-600")
        expect(client.Login).not.toHaveBeenCalled()
        expect(onLogin).not.toHaveBeenCalled()
        client.Login = vitest.fn()

        fireEvent.change(screen.getByRole("textbox", { name: "Username"}), { target: { value: "123"}})
        fireEvent.change(screen.getByLabelText("Password"), { target: { value: "123"}})

        fireEvent.click(screen.getByRole("button", { name: "Login"}))

        expect(screen.getByRole("textbox", { name: "Username" }).className).not.toContain("border-red-600")
        expect(screen.getByLabelText("Password").className).not.toContain("border-red-600")
    })

    it("has mandatory field checks 2", async () => {
        const client = new TestClient();
        client.Login = vitest.fn(async () => false)
        const onLogin = vitest.fn()
        render(<Login client={client} storage={new TestStorage()} onLogin={onLogin} />)

        fireEvent.change(screen.getByRole("textbox", { name: "Username"}), { target: { value: "123"}})

        fireEvent.click(screen.getByRole("button", { name: "Login"}))

        expect(screen.getByRole("textbox", { name: "Username" }).className).not.toContain("border-red-600")
        expect(screen.getByLabelText("Password").className).toContain("border-red-600")

        expect(client.Login).not.toHaveBeenCalled()
        expect(onLogin).not.toHaveBeenCalled()
    })

    it("has a successful login flow and store token", async () => {
        const client = new TestClient()
        const storage = new TestStorage()
        const onLogin = vitest.fn()
        render(<Login client={client} storage={storage} onLogin={onLogin} />)

        fireEvent.change(screen.getByRole("textbox", { name: "Username"}), { target: { value: TEST_USER_NAME }})
        fireEvent.change(screen.getByLabelText("Password"), { target: { value: TEST_PASSWORD }})

        fireEvent.click(screen.getByRole("button", { name: "Login"}))

        await sleep(10)

        expect(screen.getByRole("textbox", { name: "Username" }).className).not.toContain("border-red-600")
        expect(screen.getByLabelText("Password").className).not.toContain("border-red-600")

        expect(onLogin).toHaveBeenCalled()
        expect(storage.Get(STORED_TOKEN)).toBe(TEST_TOKEN)
    })

    it("has a unsuccessful login flow", async () => {
        const client = new TestClient();
        client.Login = vitest.fn(async ()=>  false)
        const onLogin = vitest.fn()
        render(<Login client={client} storage={new TestStorage()} onLogin={onLogin} />)

        fireEvent.change(screen.getByRole("textbox", { name: "Username"}), { target: { value: "user1"}})
        fireEvent.change(screen.getByLabelText("Password"), { target: { value: "hispass"}})

        fireEvent.click(screen.getByRole("button", { name: "Login"}))

        await sleep(10)

        expect(screen.getByRole("textbox", { name: "Username" }).className).not.toContain("border-red-600")
        expect(screen.getByLabelText("Password").className).not.toContain("border-red-600")

        expect(client.Login).toHaveBeenCalledOnce()
        expect(client.Login).toHaveBeenCalledWith("user1", "hispass")

        expect(onLogin).not.toHaveBeenCalled()
    })
})