import { useState } from "react"
import { formatDateToDay } from "./utils"

export interface EntryFormProps {
    date: Date
}
export const EntryForm = (props: EntryFormProps) => {
    const initialDate = props.date
    const [date, setDate] = useState(initialDate)
    const [title, setTitle] = useState("")
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
            <input type="number" />
        </label>
        <label>
            Date
            <input type="date" 
                    value={formatDateToDay(date)}
                    onChange={(event) => setDate(new Date(event.target.value))} 
                    />
        </label>
        <button>Save</button>
    </div>
}