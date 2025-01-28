import { useState } from "react"
import { areSame, formatDateToDay } from "./utils"
import { IClient } from "./api/Client"
import { Entry } from "./api/Entry"
import { Category } from "./api/Category"
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
    const [categoryId, setCategoryId] = useState(0)
    return <div data-testid="entry-form">
        <label>
            Title
            <input type="text"
                value={title}
                onChange={event => setTitle(event.target.value)}
             />
        </label>
        <label>
            Value
            <input 
                className={isNaN(parseFloat(value))? "invalid": ""}
                type="number" 
                value={value}
                onChange={event => setValue(event.target.value)}
            />
        </label>
        <label>
            Date
            <input type="date" 
                    value={formatDateToDay(date)}
                    onChange={(event) => setDate(new Date(event.target.value))} 
                    />
        </label>
        <CategoryControl 
            client={client}
            categoryId={categoryId}
            onChange={newCatId => setCategoryId(newCatId)} 
            />
        <button onClick={() => {
            const valueFloat = parseFloat(value)
            if(isNaN(valueFloat)) {
                return
            }
            const entry = new Entry(0, date, title, valueFloat)
            entry.categoryId = categoryId
            client.AddEntry(entry)
            .then(onSave)
        }}>Save</button>
        <button onClick={() => {
            if(onCancel) { onCancel()}
        }}>Cancel</button>
    </div>
}