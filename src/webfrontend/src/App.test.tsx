import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import {describe, expect, it} from 'vitest'
import '@testing-library/jest-dom'
import { TEST_PASSWORD, TEST_TOKEN, TEST_USER_NAME, TestClient } from "./__test__/TestClient";
import { sleep } from "./__test__/testutils";
import { TestStorage } from "./__test__/TestStorage";
import { STORED_TOKEN } from "./storage/Storage";

describe("App", () => {
    it("shows login form when have never logged in", () => {
        const client = new TestClient()
        render(<App client={client} storage={new TestStorage()} />)

        expect(screen.getByTestId("login-view")).toBeInTheDocument()
    })

    it("shows main view when was logged in before", async () => {
        const client = new TestClient();
        const testStorage = new TestStorage();
        testStorage.Set(STORED_TOKEN, TEST_TOKEN)
        render(<App client={client} storage={testStorage} />)

        await sleep(10)

        expect(screen.getByTestId("main-view")).toBeInTheDocument()
    })

    it("shows login form after logging out", async () => {
        const client = new TestClient();
        const testStorage = new TestStorage();
        testStorage.Set(STORED_TOKEN, TEST_TOKEN)
        render(<App client={client} storage={testStorage} />)

        await sleep(10)

        expect(screen.getByTestId("main-view")).toBeInTheDocument()

        fireEvent.click(screen.getByRole("button", { name: "Log out" }))

        expect(await client.IsLoggedIn()).toBeFalsy()
        expect(screen.getByTestId("login-view")).toBeInTheDocument()
    })

    it("shows main view when already logged in", async () => {
        const client = new TestClient();
        client.Login(TEST_USER_NAME, TEST_PASSWORD)
        render(<App client={client} storage={new TestStorage()} />)

        await sleep(10)

        expect(screen.getByTestId("main-view")).toBeInTheDocument()
    })

    it("shows main view after logging in", async () => {
        const client = new TestClient()
        render(<App client={client} storage={new TestStorage()} />)
        
        await sleep(10)

        expect(screen.getByTestId("login-view")).toBeInTheDocument()

        fireEvent.change(screen.getByRole("textbox", { name: "Username"}), { target: { value: TEST_USER_NAME}})
        fireEvent.change(screen.getByLabelText("Password"), { target: { value: TEST_PASSWORD}})

        fireEvent.click(screen.getByRole("button", { name: "Login"}))
        await sleep(10)

        expect(screen.getByTestId("main-view")).toBeInTheDocument()
    })

    it("still shows login form if logging in was failed", async () => {
        const client = new TestClient()
        render(<App client={client} storage={new TestStorage()} />)
        
        await sleep(10)

        expect(screen.getByTestId("login-view")).toBeInTheDocument()

        fireEvent.change(screen.getByRole("textbox", { name: "Username"}), { target: { value: "incorrect_user"}})
        fireEvent.change(screen.getByLabelText("Password"), { target: { value: "incorrect_pass"}})

        fireEvent.click(screen.getByRole("button", { name: "Login"}))
        await sleep(10)

        expect(screen.getByTestId("login-view")).toBeInTheDocument()
    })
})