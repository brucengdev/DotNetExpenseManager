import { useState } from "react"
import { formatDateToDay } from "./utils"
import { IClient } from "./api/Client"
import { Entry } from "./api/Entry"

export interface EntryFormProps {
    date: Date
    onSave: () => void
    client: IClient
}
export const EntryForm = (props: EntryFormProps) => {
    const initialDate = props.date
    const onSave = props.onSave
    const client = props.client
    const [date, setDate] = useState(initialDate)
    const [title, setTitle] = useState("")
    const [value, setValue] = useState("0")
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
        <button onClick={() => {
            const valueFloat = parseFloat(value)
            if(isNaN(valueFloat)) {
                return
            }
            client.AddEntry(new Entry(date, title, valueFloat))
            .then(onSave)
        }}>Save</button>
    </div>
}