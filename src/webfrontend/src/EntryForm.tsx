import { useState } from "react"
import { addMonths, formatDateToDay } from "./utils"
import { IClient } from "./api/Client"
import { Entry } from "./models/Entry"
import { CategoryControl } from "./controls/CategoryControl"
import { TextBox } from "./controls/TextBox"
import { Button, ButtonMode } from "./controls/Button"
import { Tag } from "./models/Tag"
import { Payee } from "./models/Payee"
import { AverageMonthlyIncomeReport } from "./models/AverageMonthlyIncomeReport"
import { Select } from "./controls/Select"
import { LabeledMultiSelect } from "./controls/LabeledMultiSelect"

export interface EntryFormProps {
    date: Date
    onSave: () => void
    client: IClient
    onCancel?: () => void
}
export const EntryForm = (props: EntryFormProps) => {
    const initialDate = props.date
    const onSave = props.onSave
    const onCancel = props.onCancel
    const client = props.client
    const [date, setDate] = useState(initialDate)
    const [title, setTitle] = useState("")
    const [value, setValue] = useState("0")
    const [categoryId, setCategoryId] = useState(1)
    const [tags, setTags] = useState<Tag[] | undefined>(undefined)
    const [payees, setPayees] = useState<Payee[] | undefined>(undefined)
    const [tagIds, setTagIds] = useState<number[]>([])
    const [payeeId, setPayeeId] = useState<number | undefined>(undefined)
    const [notes, setNotes] = useState("")
    const [averageMonthlyIncomeReport, setAverageMonthlyIncomeReport] = useState<AverageMonthlyIncomeReport | undefined>(undefined)
    if(tags === undefined) {
        client.GetTags()
        .then(retrievedTags => setTags(retrievedTags))
    }
    if(payees === undefined) {
        client.GetPayees()
        .then(retrievedPayees => setPayees(retrievedPayees))
    }

    const sortedTags = (tags || []).sort((a, b) => a.name.localeCompare(b.name))
    const sortedPayees = (payees || []).sort((a, b) => a.name.localeCompare(b.name));

    if(averageMonthlyIncomeReport === undefined) {
        (async () => {
            const monthOnly = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0)
            const endMonth = addMonths(monthOnly, -1)
            const startMonth = addMonths(endMonth, -5)
            const retrievedReport = await client.GetAverageMonthlyIncome(startMonth, endMonth)
            setAverageMonthlyIncomeReport(retrievedReport)
        })()
    }

    const percentageOfIncome = parseFloat(value)/(averageMonthlyIncomeReport?.averageIncome ?? 1) * -100

    return <div data-testid="entry-form">
        <TextBox
            name="title"
            label="Title"
            value={title}
            onChange={event => setTitle(event.target.value)}
        />
        <TextBox
            name="value"
            label="Value"
            type="number"
            value={value}
            onChange={event => setValue(event.target.value)}
            inputClassName={isNaN(parseFloat(value))? "border-red-600": ""}
        />
        <div>
            <div data-testId="percentage-of-income">
                {percentageOfIncome}% of your average monthly income in last 6 months
            </div>
        </div>
        <TextBox
            name="date"
            label="Date"
            type="date"
            value={formatDateToDay(date)}
            onChange={(event) => setDate(new Date(event.target.value))} 
        />
        <CategoryControl 
            client={client}
            categoryId={categoryId}
            onChange={newCatId => setCategoryId(newCatId)} 
            />

        <LabeledMultiSelect
            label="Tags"
            selectDataTestId="tags-control"
            options={sortedTags.map(tag => ({ value: tag.id.toString(), text: tag.name }))}
            selectedValues={tagIds.map(id => id.toString())}
            onChange={values => {
                setTagIds(values.map(v => parseInt(v)))
            }}
        />

        <Select
            elementId="payee-select"
            label="Payee"
            value={payeeId?.toString() ?? ""}
            onChange={newValue => {
                const newPayeeId = newValue ? parseInt(newValue) : undefined
                setPayeeId(newPayeeId)
            }}

            options={[{ value: undefined as string | undefined, text: "[No payee]"}]
            .concat(
                sortedPayees.map(p => {
                    return { value: p.id?.toString(), text: p.name }
                })
            )}
        />

        <TextBox
            name="notes"
            label="Notes"
            type="text"
            value={notes}
            onChange={event => setNotes(event.target.value)}
        />
        
        <div className="mt-5">
            <Button
                className="inline-block mr-2"
                text="Save"
                onClick={() => {
                    const valueFloat = parseFloat(value)
                    if(isNaN(valueFloat)) {
                        return
                    }
                    const entry = new Entry(0, date, title, valueFloat, 
                        categoryId, tagIds, payeeId, notes)
                    client.AddEntry(entry)
                    .then(onSave)
                }}
            />
            <Button
                className="inline-block"
                text="Cancel"
                mode={ButtonMode.SECONDARY}
                onClick={() => {
                    if(onCancel) { onCancel()}
                }}
            />
        </div>
    </div>
}