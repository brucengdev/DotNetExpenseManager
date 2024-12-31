import { useState } from "react"
import { IClient } from "./api/Client"
import { Entry } from "./EntryView"
import { Expense } from "./api/Expense"

export interface DayViewProps {
    client: IClient
    date: Date
}

export const DayView = ({client, date}: DayViewProps) => {
    const [entries, setEntries] = useState([] as Expense[])
    client.GetExpensesByDate(date)
    .then(expenses => {
        if(!areEntriesSame(expenses, entries)) {
            console.log("entries length = " + expenses.length)
            setEntries(expenses)
        }
    })

    return <div data-testid="day-view">
        {
            entries.map(({title, value}) => <Entry title={title} value={value} />)
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
