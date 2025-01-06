import { useState } from "react"
import { IClient } from "./api/Client"
import { EntryView } from "./EntryView"
import { Entry } from "./api/Entry"
import { EntryForm } from "./EntryForm"
import { formatDisplayDate } from "./utils"

export interface DayViewProps {
    client: IClient
    date: Date
}

export const DayView = ({client, date}: DayViewProps) => {
    const [addingEntry, setAddingEntry] = useState(false)
    const [entries, setEntries] = useState([] as Entry[])
    client.GetEntriesByDate(date)
    .then(serverEntries => {
        if(!areEntriesSame(serverEntries, entries)) {
            setEntries(serverEntries)
        }
    })

    return <div data-testid="day-view">
            {addingEntry? <EntryForm client={client} date={date} onSave={() => { setAddingEntry(false) } } /> :
                <div>
                    <div data-testid="entry-list">
                        <h2>{formatDisplayDate(date)}</h2>
                        {entries.map(({title, value}) => <EntryView title={title} value={value} />)}
                    </div>
                    <button onClick={() => setAddingEntry(true)}>+</button>
                </div>
            }
        </div>
}

function areEntriesSame(entries1: Entry[], entries2: Entry[]) {
    if(entries1.length !== entries2.length) {
        return false
    }
    for(let i = 0; i < entries1.length; i++) {
        if(!entries1[i].Equals(entries2[i])) {
            return false
        }
    }
    return true
}
