import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it, vitest } from "vitest";
import { EntryFiltersView } from "./EntryFiltersView";
import "@testing-library/jest-dom"
import { TestClient } from "./__test__/TestClient";
import { Category } from "./models/Category";
import { Payee } from "./models/Payee";
import { Tag } from "./models/Tag";
import userEvent from "@testing-library/user-event";
import { Entry } from "./models/Entry";

describe("EntryFiltersView", () => {
    it("has necessary UI", async () => {
        const client = new TestClient()
        client.Categories = [
            new Category(1, "Uncategorized"),
            new Category(2, "household"),
            new Category(3, "food"),
            new Category(4, "utilities")
        ]
        client.Tags = [
            new Tag(2, "tag2"),
            new Tag(1, "tag1"),
            new Tag(3, "tag3")
        ]
        client.Payees = [
            new Payee(1, "Tom"),
            new Payee(2, "Jane")
        ]
        render(<EntryFiltersView client={client} />)

        const fromDateField = screen.getByLabelText("From date")
        expect(fromDateField).toBeInTheDocument()
        expect(fromDateField).toHaveValue("")

        const toDateField = screen.getByLabelText("To date")
        expect(toDateField).toBeInTheDocument()
        expect(toDateField).toHaveValue("")

        const categoryField = screen.getByLabelText("Categories")
        expect(categoryField).toBeInTheDocument()
        await waitFor(() => {
            const categoryOptions = within(categoryField).getAllByRole("option")
            categoryOptions.forEach(co => expect(co).not.toBeChecked())
            const categoryNames = categoryOptions.map(co => co.textContent)
            expect(categoryNames).toStrictEqual(["Uncategorized", "food", "household", "utilities"])
        })

        expect(screen.getByLabelText("Tags")).toBeInTheDocument()
        const tagsField = screen.getByTestId("tags-control")
        expect(tagsField).toBeInTheDocument()

        await waitFor(() => {
            const tagOptions = within(tagsField).getAllByRole("option")
            tagOptions.forEach(to => expect(to).not.toBeChecked())

            const tagNames = tagOptions.map(to => to.textContent)
            expect(tagNames).toStrictEqual(["tag1", "tag2", "tag3"])
        })

        const payeeField = screen.getByLabelText("Payees")
        expect(payeeField).toBeInTheDocument()

        await waitFor(() => {
            const payeeOptions = within(payeeField).getAllByRole("option")
            payeeOptions.forEach(po => expect(po).not.toBeChecked())

            //payees must be sorted
            const payeeNames = payeeOptions.map(to => to.textContent)
            expect(payeeNames).toStrictEqual(["[No payee]", "Jane", "Tom"])

            const payeeIds = payeeOptions.map(to => (to as HTMLOptionElement).value)
            expect(payeeIds).toStrictEqual(["0", "2", "1"])
        })

        const expensesCheckbox = screen.getByRole("checkbox", { name: "Expenses"})
        expect(expensesCheckbox).toBeInTheDocument()
        expect(expensesCheckbox).toBeChecked()

        const incomeCheckbox = screen.getByRole("checkbox", { name: "Income"})
        expect(incomeCheckbox).toBeInTheDocument()
        expect(incomeCheckbox).toBeChecked()
    })

    it("updates date filters", async () => {
        const client = new TestClient()
        client.GetEntries = vitest.fn(
            async (_fromDate: Date, _toDate: Date, _categoryIds:number[], _tagIds: number[], _payeeIds: number[]) => {
                return [
                    new Entry(1, new Date("2022-02-22"), "entry 1", -123)
                ]
            }
        )
        render(<EntryFiltersView client={client} />)

        const fromDateField = screen.getByLabelText("From date")
        fireEvent.change(fromDateField, { target: { value: "2022-02-22" } })
        expect(fromDateField).toHaveValue("2022-02-22")

        await waitFor(() => {
            expect(client.GetEntries).toHaveBeenCalledWith(
                new Date("2022-02-22"),
                undefined,
                [],
                [],
                [],
                true,
                true
            )
        })

        const toDateField = screen.getByLabelText("To date")
        fireEvent.change(toDateField, { target: { value: "2022-02-25" } })
        expect(toDateField).toHaveValue("2022-02-25")

        await waitFor(() => {
            expect(client.GetEntries).toHaveBeenCalledWith(
                new Date("2022-02-22"),
                new Date("2022-02-25"),
                [],
                [],
                [],
                true,
                true
            )
        })
    })

    it("sets value for category filters", async () => {
        const client = new TestClient()
        client.GetEntries = vitest.fn(
            async (_fromDate: Date, _toDate: Date, _categoryIds:number[], _tagIds: number[], _payeeIds: number[]) => {
                return [
                    new Entry(1, new Date("2022-02-22"), "entry 1", -123)
                ]
            }
        )
        client.Categories = [
            new Category(1, "Uncategorized"),
            new Category(2, "household"),
            new Category(3, "food"),
            new Category(4, "utilities")
        ]
        render(<EntryFiltersView client={client} />)

        const categoryField = screen.getByLabelText("Categories")
        await waitFor(() => {
            const categoryOptions = within(categoryField).getAllByRole("option")
            expect(categoryOptions).toHaveLength(4)
        })
        userEvent.selectOptions(categoryField, ["2", "4"])
        expect(categoryField).toHaveValue(["2","4"])

        await waitFor(() => {
            expect(client.GetEntries).toHaveBeenCalledWith(
                undefined,
                undefined,
                [2, 4],
                [],
                [],
                true,
                true
            )
        })
    })

    it("sets value for tag filters", async () => {
        const client = new TestClient()
        client.GetEntries = vitest.fn(
            async (_fromDate: Date, _toDate: Date, _categoryIds:number[], _tagIds: number[], _payeeIds: number[]) => {
                return [
                    new Entry(1, new Date("2022-02-22"), "entry 1", -123)
                ]
            }
        )
        client.Tags = [
            new Tag(2, "tag2"),
            new Tag(1, "tag1"),
            new Tag(3, "tag3")
        ]
        render(<EntryFiltersView client={client} />)

        expect(screen.getByLabelText("Tags")).toBeInTheDocument()
        const tagsField = screen.getByTestId("tags-control")

        await waitFor(() => {
            const tagOptions = within(tagsField).getAllByRole("option")
            expect(tagOptions).toHaveLength(3)
        })
        userEvent.selectOptions(tagsField, ["2", "1"])
        expect(tagsField).toHaveValue(["2","1"])

        await waitFor(() => {
            expect(client.GetEntries).toHaveBeenCalledWith(
                undefined,
                undefined,
                [],
                [1, 2],
                [],
                true,
                true
            )
        })
    })

    it("sets value for expenses checkbox", async () => {
        const client = new TestClient()
        client.GetEntries = vitest.fn(
            async (_fromDate: Date, _toDate: Date, _categoryIds:number[], _tagIds: number[], _payeeIds: number[]) => {
                return [
                    new Entry(1, new Date("2022-02-22"), "entry 1", -123)
                ]
            }
        )
        render(<EntryFiltersView client={client} />)

        await waitFor(() => {
            expect(client.GetEntries).toHaveBeenCalledWith(
                undefined,
                undefined,
                [],
                [],
                [],
                true,
                true
            )
        })

        const expensesCheckbox = screen.getByRole("checkbox", { name: "Expenses"})
        fireEvent.click(expensesCheckbox)
        expect(expensesCheckbox).not.toBeChecked()

        await waitFor(() => {
            expect(client.GetEntries).toHaveBeenCalledWith(
                undefined,
                undefined,
                [],
                [],
                [],
                false,
                true
            )
        })

        fireEvent.click(expensesCheckbox)
        expect(expensesCheckbox).toBeChecked()

        await waitFor(() => {
            expect(client.GetEntries).toHaveBeenCalledWith(
                undefined,
                undefined,
                [],
                [],
                [],
                true,
                true
            )
        })
    })


    it("set value for payee filters", async () => {
        const client = new TestClient()
        client.GetEntries = vitest.fn(
            async (_fromDate: Date, _toDate: Date, _categoryIds:number[], _tagIds: number[], _payeeIds: number[]) => {
                return [
                    new Entry(1, new Date("2022-02-22"), "entry 1", -123)
                ]
            }
        )
        client.Payees = [
            new Payee(1, "Tom"),
            new Payee(2, "Jane"),
            new Payee(3, "Bob"),
            new Payee(4, "Barb"),
        ]
        render(<EntryFiltersView client={client} />)

        const payeeField = screen.getByLabelText("Payees")
        expect(payeeField).toBeInTheDocument()

        await waitFor(() => {
            const payeeOptions = within(payeeField).getAllByRole("option")
            expect(payeeOptions).toHaveLength(5)
        })

        userEvent.selectOptions(payeeField, ["2", "4"])
        expect(payeeField).toHaveValue(["2", "4"])

        await waitFor(() => {
            expect(client.GetEntries).toHaveBeenCalledWith(
                undefined,
                undefined,
                [],
                [],
                [4, 2],
                true,
                true
            )
        })
    })

    it("calls server to list entries", async () => {
        const client = new TestClient()
        client.Categories = [
            new Category(1, "Uncategorized"),
            new Category(2, "household"),
            new Category(3, "food"),
            new Category(4, "utilities")
        ]
        client.Tags = [
            new Tag(2, "tag2"),
            new Tag(1, "tag1"),
            new Tag(3, "tag3")
        ]
        client.Payees = [
            new Payee(1, "Tom"),
            new Payee(2, "Jane"),
            new Payee(3, "Jack")
        ]
        client.GetEntries = vitest.fn(
            async (_fromDate: Date, _toDate: Date, _categoryIds:number[], _tagIds: number[], _payeeIds: number[]) => {
                return [
                    new Entry(1, new Date("2022-02-22"), "entry 1", -123),
                    new Entry(2, new Date("2022-02-23"), "entry 2", 2230)
                ]
            }
        )
        render(<EntryFiltersView client={client} />)

        const fromDateField = screen.getByLabelText("From date")
        fireEvent.change(fromDateField, { target: {value: "2022-02-22"}})

        const toDateField = screen.getByLabelText("To date")
        fireEvent.change(toDateField, {target: { value: "2022-03-12"}})

        const categoryField = screen.getByLabelText("Categories")
        await waitFor(() => {
            const categoryOptions = within(categoryField).getAllByRole("option")
            expect(categoryOptions.length).toBeGreaterThan(0)
        })
        userEvent.selectOptions(categoryField, ["2", "4"])

        const tagsField = screen.getByTestId("tags-control")
        await waitFor(() => {
            const tagOptions = within(tagsField).getAllByRole("option")
            expect(tagOptions.length).toBeGreaterThan(0)
        })
        userEvent.selectOptions(tagsField, ["1", "3"])

        const payeeField = screen.getByLabelText("Payees")
        await waitFor(() => {
            const payeeOptions = within(payeeField).getAllByRole("option")
            expect(payeeOptions.length).toBeGreaterThan(0)
        })
        userEvent.selectOptions(payeeField, ["2", "3"])

        await waitFor(() => {
            expect(client.GetEntries).toHaveBeenCalledWith(
                new Date("2022-02-22"),
                new Date("2022-03-12"),
                [2, 4],
                [1, 3],
                [3, 2],
                true,
                true
            )
        })

        const entries = await screen.findAllByTestId("entry")
        expect(entries).toHaveLength(2)

        expect(within(entries[0]).getByTestId("date").textContent).toBe("2022-02-22")
        expect(within(entries[0]).getByTestId("title").textContent).toBe("entry 1")
        expect(within(entries[0]).getByTestId("value").textContent).toBe("-123 ₫")

        expect(within(entries[1]).getByTestId("date").textContent).toBe("2022-02-23")
        expect(within(entries[1]).getByTestId("title").textContent).toBe("entry 2")
        expect(within(entries[1]).getByTestId("value").textContent).toBe("2.230 ₫")

        expect(screen.getByTestId("total-income").textContent).toBe("Total income2.230 ₫")
        expect(screen.getByTestId("total-expenses").textContent).toBe("Total expenses-123 ₫")
        expect(screen.getByTestId("savings").textContent).toBe("Savings2.107 ₫")
    })
})