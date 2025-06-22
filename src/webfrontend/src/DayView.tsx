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

    return <div data-testid="day-view" className="mb-5">
            {addingEntry? <EntryForm 
                        client={client} 
                        date={date} 
                        onSave={() => { setAddingEntry(false) } } 
                        onCancel={() => setAddingEntry(false) }
                        /> :
                <div>
                    <div data-testid="entry-list">
                        <div className="grid grid-cols-4 mb-5">
                            <div>
                                <Button mode={ButtonMode.SECONDARY} onClick={() => setDate(addDays(date, -1))} text="&lt;" />
                            </div>
                            <h2 className="col-span-2 text-center">{formatDisplayDate(date)}</h2>
                            <div className="place-items-end">
                                <Button mode={ButtonMode.SECONDARY} onClick={() => setDate(addDays(date, 1))} text="&gt;" />
                            </div>
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
                    <div>
                        <Button text="+"  onClick={() => setAddingEntry(true)} />
                    </div>
                </div>
            }
        </div>
}