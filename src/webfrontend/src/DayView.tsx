import { useState } from "react"
import { IClient } from "./api/Client"
import { EntryView } from "./EntryView"
import { Entry } from "./api/Entry"
import { EntryForm } from "./EntryForm"
import { addDays, areSame, formatDisplayDate } from "./utils"

export interface DayViewProps {
    client: IClient
    initialDate: Date
}

export const DayView = ({client, initialDate}: DayViewProps) => {
    const [addingEntry, setAddingEntry] = useState(false)
    const [entries, setEntries] = useState([] as Entry[])
    const [date, setDate] = useState(initialDate)
    client.GetEntriesByDate(date)
    .then(serverEntries => {
        if(!areSame(serverEntries, entries)) {
            setEntries(serverEntries)
        }
    })

    return <div data-testid="day-view">
            {addingEntry? <EntryForm 
                        client={client} 
                        date={date} 
                        onSave={() => { setAddingEntry(false) } } 
                        onCancel={() => setAddingEntry(false) }
                        /> :
                <div>
                    <div data-testid="entry-list">
                        <div>
                            <button className="col" onClick={() => setDate(addDays(date, -1))}>&lt;</button>
                            <h2 className="col">{formatDisplayDate(date)}</h2>
                            <button className="col" onClick={() => setDate(addDays(date, 1))}>&gt;</button>
                        </div>
                        {entries.map(({id, title, value}) => <EntryView title={title} value={value} onDelete={() => client.DeleteEntry(id)} />)}
                    </div>
                    <button onClick={() => setAddingEntry(true)}>+</button>
                </div>
            }
        </div>
}