import { useState } from "react"
import { formatDateToDay } from "./utils"
import { IClient } from "./api/Client"
import { Entry } from "./models/Entry"
import { CategoryControl } from "./controls/CategoryControl"

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
        <label className="row">
            Title
            <input type="text"
                className="form-control"
                value={title}
                onChange={event => setTitle(event.target.value)}
             />
        </label>
        <label className="row">
            Value
            <input 
                className={isNaN(parseFloat(value))? "invalid form-control": "form-control"}
                type="number" 
                value={value}
                onChange={event => setValue(event.target.value)}
            />
        </label>
        <label className="row">
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
        <div className="row">
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