import { useState } from "react"
import { formatDateToDay } from "./utils"

export interface EntryFormProps {
    date: Date
}
export const EntryForm = (props: EntryFormProps) => {
    const initialDate = props.date
    const [date, setDate] = useState(initialDate)
    const [title, setTitle] = useState("")
    const [value, setValue] = useState(0 as number)
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
            <input type="number" 
                value={value}
                onChange={event => setValue(parseFloat(event.target.value))}
            />
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