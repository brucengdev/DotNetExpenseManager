import { screen, render } from "@testing-library/react";
import App from "../App";
import {describe, expect, it} from 'vitest'
import '@testing-library/jest-dom'
import { TestClient } from "./TestClient";
import { sleep } from "./testutils";
import { act } from "react";

describe("App", () => {
    it("shows login form when not logged in", () => {
        const client = new TestClient()
        client.LoggedIn = false;
        render(<App client={client} />)

        expect(screen.getByRole("heading", { name: "Login"})).toBeInTheDocument()
    })

    it("shows main view when logged in", async () => {
        const client = new TestClient();
        client.LoggedIn = true;
        render(<App client={client} />)

        await sleep(10)

        expect(screen.getByRole("heading", { name: "Expenses"})).toBeInTheDocument()
    })
})