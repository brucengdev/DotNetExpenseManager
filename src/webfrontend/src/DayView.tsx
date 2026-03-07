import { useState } from "react"
import { IClient } from "./api/Client"
import { EntryView } from "./EntryView"
import { Entry } from "./models/Entry"
import { EntryForm } from "./EntryForm"
import { addDays, areSame, formatDateToDay } from "./utils"
import { Category } from "./models/Category"
import { Button, ButtonMode } from "./controls/Button"
import { Tag } from "./models/Tag"
import { Payee } from "./models/Payee"
import { TextBox } from "./controls/TextBox"

export interface DayViewProps {
    client: IClient
    initialDate: Date
}

export const DayView = ({client, initialDate}: DayViewProps) => {
    const [addingEntry, setAddingEntry] = useState(false)
    const [entries, setEntries] = useState([] as Entry[])
    const [categories, setCategories] = useState([] as Category[])
    const [tags, setTags] = useState([] as Tag[])
    const [date, setDate] = useState(initialDate)
    const [payees, setPayees] = useState<Payee[]>([])
    client.GetCategories()
    .then(serverCategories => {
        if(!areSame(serverCategories, categories)) {
            setCategories(serverCategories)
        }
    })
    client.GetPayees()
    .then(serverPayees => {
        if(!areSame(serverPayees, payees)) {
            setPayees(serverPayees)
        }
    })
    client.GetEntriesByDate(date)
    .then(serverEntries => {
        if(!areSame(serverEntries, entries)) {
            setEntries(serverEntries)
        }
    })
    client.GetTags()
    .then(serverTags => {
        if(!areSame(serverTags, tags)) {
            setTags(serverTags)
        }
    })

    function buildTagsString(tagIds: number[], tags: Tag[]): string {
        if(tagIds === undefined || tagIds === null || tagIds.length === 0) {
            return ""
        }
        return tagIds.map(tagId => (tags ?? []).find(t => t.id === tagId)?.name ?? "")
            .join(",")
    }

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
                            <TextBox 
                                name="date" 
                                label="Date" 
                                type="date"
                                className="col-span-2"
                                value={formatDateToDay(date)} 
                                onChange={(e) => setDate(new Date(e.target.value))}
                            />
                            <div className="place-items-end">
                                <Button mode={ButtonMode.SECONDARY} onClick={() => setDate(addDays(date, 1))} text="&gt;" />
                            </div>
                        </div>
                        {entries.map(({id, title, value, categoryId, tagIds, payeeId, notes}) => 
                            <EntryView 
                                title={title}
                                value={value}
                                tags={buildTagsString(tagIds, tags)}
                                categoryName={categories.find(c => c.id === categoryId)?.name ?? "Uncategorized" } 
                                payee={payees.find(p => p.id === payeeId)?.name ?? ""}
                                notes={notes}
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