import { useState } from "react"
import { formatDateToDay } from "./utils"

export interface EntryFormProps {
    date: Date
}
export const EntryForm = (props: EntryFormProps) => {
    const initialDate = props.date
    const [date, setDate] = useState(initialDate)
    return <div data-testid="entry-form">
        <label>
            Title
            <input type="text" />
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