import { useState } from "react"
import { IClient } from "./api/Client"
import { Entry } from "./EntryView"
import { Expense } from "./api/Expense"
import { EntryForm } from "./EntryForm"

export interface DayViewProps {
    client: IClient
    date: Date
}

export const DayView = ({client, date}: DayViewProps) => {
    const [addingEntry, setAddingEntry] = useState(false)
    const [entries, setEntries] = useState([] as Expense[])
    client.GetExpensesByDate(date)
    .then(expenses => {
        if(!areEntriesSame(expenses, entries)) {
            setEntries(expenses)
        }
    })

    return <div data-testid="day-view">
            {addingEntry? <EntryForm client={client} date={date} onSave={() => { setAddingEntry(false) } } /> :
                <div>
                    <div data-testid="entry-list">
                        {entries.map(({title, value}) => <Entry title={title} value={value} />)}
                    </div>
                    <button onClick={() => setAddingEntry(true)}>+</button>
                </div>
            }
        </div>
}

function areEntriesSame(expenses: Expense[], entries: Expense[]) {
    if(expenses.length !== entries.length) {
        return false
    }
    for(let i = 0; i < expenses.length; i++) {
        if(!expenses[i].Equals(entries[i])) {
            return false
        }
    }
    return true
}
