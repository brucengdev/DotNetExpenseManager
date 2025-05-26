import { useState } from "react"
import { formatDateToDay } from "./utils"
import { IClient } from "./api/Client"
import { Entry } from "./models/Entry"
import { CategoryControl } from "./controls/CategoryControl"
import { TextBox } from "./controls/TextBox"

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
    const [categoryId, setCategoryId] = useState(undefined as number | undefined)
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
            inputClassName={isNaN(parseFloat(value))? "invalid": ""}
        />
        <label>
            Date
            <input type="date" 
                    className="form-control"
                    value={formatDateToDay(date)}
                    onChange={(event) => setDate(new Date(event.target.value))} 
                    />
        </label>
        <CategoryControl 
            client={client}
            categoryId={categoryId}
            onChange={newCatId => setCategoryId(newCatId)} 
            />
        <div>
            <button 
                className="btn btn-primary col-4"
                onClick={() => {
                    const valueFloat = parseFloat(value)
                    if(isNaN(valueFloat)) {
                        return
                    }
                    const entry = new Entry(0, date, title, valueFloat)
                    entry.categoryId = categoryId
                    client.AddEntry(entry)
                    .then(onSave)
            }}>Save</button>
            <button 
                className="btn btn-secondary col-4"
                onClick={() => {
                    if(onCancel) { onCancel()}
            }}>Cancel</button>
        </div>
    </div>
}