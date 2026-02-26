import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import {describe, expect, it} from 'vitest'
import '@testing-library/jest-dom'
import { TestClient } from "./__test__/TestClient";
import { Payee } from "./models/Payee";
import { PayeesView } from "./PayeesView";

describe("PayeesView", () => {
    it("has necessary ui components", async () => {
        const testClient = new TestClient()
        testClient.Payees = [
            new Payee(1, "Payee 1"),
            new Payee(2, "Payee 2")
        ]
        render(<PayeesView client={testClient} />)
        await waitFor(() => {
            const payees = screen.queryAllByTestId("payee")
            expect(payees).toHaveLength(2)
        })

        const payeeNames = screen.queryAllByTestId("payee-name").map(t => t.textContent)
        expect(payeeNames).toStrictEqual(["Payee 1", "Payee 2"])

        expect(screen.getByRole("button", { name: "+"})).toBeInTheDocument()
        expect(screen.queryByTestId("add-payee-form")).not.toBeInTheDocument()
    })

    it("shows add payee form when add button is clicked", async () => {
        const testClient = new TestClient()
        render(<PayeesView client={testClient} />)
        
        fireEvent.click(screen.getByRole("button", { name: "+"}))
        expect(await screen.findByTestId("add-payee-form")).toBeInTheDocument()
    })

    it("hides add payee form when cancel button is clicked", async () => {
        const testClient = new TestClient()
        render(<PayeesView client={testClient} />)
        
        fireEvent.click(screen.getByRole("button", { name: "+"}))
        expect(await screen.findByTestId("add-payee-form")).toBeInTheDocument()

        fireEvent.click(screen.getByRole("button", { name: "Cancel"}))
        expect(screen.queryByTestId("add-payee-form")).not.toBeInTheDocument()
    })

    it("creates and shows new payee", async () => {
        const testClient = new TestClient()
        testClient.Payees = [
            new Payee(1, "Existing Payee")
        ]
        render(<PayeesView client={testClient} />)

        expect(await screen.findAllByTestId("payee")).toHaveLength(1)
        
        fireEvent.click(screen.getByRole("button", { name: "+"}))

        fireEvent.change(screen.getByLabelText("Payee name"), { target: { value: "New Payee"}})

        expect(screen.getByLabelText("Payee name")).toHaveValue("New Payee")

        fireEvent.click(screen.getByRole("button", { name: "Save"}))

        await waitFor(() => {
            expect(screen.queryByTestId("add-payee-form")).not.toBeInTheDocument()

            expect(screen.getAllByTestId("payee")).toHaveLength(2)

            const payeeNames = screen.queryAllByTestId("payee-name").map(t => t.textContent)
            expect(payeeNames).toStrictEqual(["Existing Payee", "New Payee"])
        })
    })
})