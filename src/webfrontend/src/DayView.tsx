import { useState } from "react"
import { IClient } from "./api/Client"
import { EntryView } from "./EntryView"
import { Entry } from "./models/Entry"
import { EntryForm } from "./EntryForm"
import { addDays, areSame, formatDisplayDate } from "./utils"
import { Category } from "./models/Category"
import { Button, ButtonMode } from "./controls/Button"

export interface DayViewProps {
    client: IClient
    initialDate: Date
}

export const DayView = ({client, initialDate}: DayViewProps) => {
    const [addingEntry, setAddingEntry] = useState(false)
    const [entries, setEntries] = useState([] as Entry[])
    const [categories, setCategories] = useState([] as Category[])
    const [date, setDate] = useState(initialDate)
    client.GetCategories()
    .then(serverCategories => {
        if(!areSame(serverCategories, categories)) {
            setCategories(serverCategories)
        }
    })
    client.GetEntriesByDate(date)
    .then(serverEntries => {
        if(!areSame(serverEntries, entries)) {
            setEntries(serverEntries)
        }
    })

    return <div data-testid="day-view" className="row">
            {addingEntry? <EntryForm 
                        client={client} 
                        date={date} 
                        onSave={() => { setAddingEntry(false) } } 
                        onCancel={() => setAddingEntry(false) }
                        /> :
                <div className="row">
                    <div data-testid="entry-list" className="row">
                        <div className="row">
                            <Button mode={ButtonMode.SECONDARY} onClick={() => setDate(addDays(date, -1))} text="&lt;" />
                            <h2 className="col-10">{formatDisplayDate(date)}</h2>
                            <Button mode={ButtonMode.SECONDARY} onClick={() => setDate(addDays(date, 1))} text="&gt;" />
                        </div>
                        {entries.map(({id, title, value, categoryId}) => 
                            <EntryView 
                                title={title}
                                value={value}
                                categoryName={categories.find(c => c.id === categoryId)?.name ?? "Uncategorized" } 
                                onDelete={async () => {
                                    const success = await client.DeleteEntry(id)
                                    if(success) {
                                        setEntries(entries.filter(e => e.id !== id))
                                    }
                                 }} />)}
                    </div>
                    <div className="row">
                        <Button text="+"  onClick={() => setAddingEntry(true)} />
                    </div>
                </div>
            }
        </div>
}