import { useState } from "react"
import { formatDateToDay } from "./utils"
import { IClient } from "./api/Client"
import { Entry } from "./models/Entry"
import { CategoryControl } from "./controls/CategoryControl"
import { TextBox } from "./controls/TextBox"
import { Button, ButtonMode } from "./controls/Button"
import { MultiSelect } from "./controls/MultiSelect"
import { Tag } from "./models/Tag"
import { Payee } from "./models/Payee"

export interface EntryFormProps {
    date: Date
    onSave: () => void
    client: IClient
    onCancel?: () => void
}
export const EntryForm = (props: EntryFormProps) => {
    const initialDate = props.date
    const onSave = props.onSave
    const onCancel = props.onCancel
    const client = props.client
    const [date, setDate] = useState(initialDate)
    const [title, setTitle] = useState("")
    const [value, setValue] = useState("0")
    const [categoryId, setCategoryId] = useState(1)
    const [tags, setTags] = useState<Tag[] | undefined>(undefined)
    const [payees, setPayees] = useState<Payee[] | undefined>(undefined)
    const [tagIds, setTagIds] = useState<number[]>([])
    const [payeeId, setPayeeId] = useState<number | undefined>(undefined)
    const [notes, setNotes] = useState("")
    if(tags === undefined) {
        client.GetTags()
        .then(retrievedTags => setTags(retrievedTags))
    }
    if(payees === undefined) {
        client.GetPayees()
        .then(retrievedPayees => setPayees(retrievedPayees))
    }
    return <div data-testid="entry-form">
        <TextBox
            name="title"
            label="Title"
            value={title}
            onChange={event => setTitle(event.target.value)}
        />
        <TextBox
            name="value"
            label="Value"
            type="number"
            value={value}
            onChange={event => setValue(event.target.value)}
            inputClassName={isNaN(parseFloat(value))? "border-red-600": ""}
        />
        <TextBox
            name="date"
            label="Date"
            type="date"
            value={formatDateToDay(date)}
            onChange={(event) => setDate(new Date(event.target.value))} 
        />
        <CategoryControl 
            client={client}
            categoryId={categoryId}
            onChange={newCatId => setCategoryId(newCatId)} 
            />

        <div>
            <label htmlFor="tags-control" className="block text-sm/6 font-semibold text-gray-900">Tags</label>
            <MultiSelect
                selectDataTestId="tags-control"
                options={tags ? [...tags].sort((a, b) => a.name.localeCompare(b.name)).map(tag => ({ value: tag.id.toString(), text: tag.name })) : []}
                selectedValues={tagIds.map(id => id.toString())}
                onChange={values => {
                    setTagIds(values.map(v => parseInt(v)))
                }}
            />
        </div>

        <div>
            <label htmlFor="payee-select" className="block text-sm/6 font-semibold text-gray-900">Payee</label>
            <select id="payee-select" 
                className={"block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 " +
                        "outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 "}
                value={payeeId} 
                onChange={event => {
                    const newPayeeId = event.target.value ? parseInt(event.target.value) : undefined
                    setPayeeId(newPayeeId)}
                }
            >
                <option key={0} value={undefined}>[No payee]</option>
                {payees ? payees.map(payee => (
                    <option key={payee.id} value={payee.id}>{payee.name}</option>
                )) : null}
            </select>
        </div>

        <TextBox
            name="notes"
            label="Notes"
            type="text"
            value={notes}
            onChange={event => setNotes(event.target.value)}
        />
        
        <div className="mt-5">
            <Button
                className="inline-block mr-2"
                text="Save"
                onClick={() => {
                    const valueFloat = parseFloat(value)
                    if(isNaN(valueFloat)) {
                        return
                    }
                    const entry = new Entry(0, date, title, valueFloat, 
                        categoryId, tagIds, payeeId, notes)
                    client.AddEntry(entry)
                    .then(onSave)
                }}
            />
            <Button
                className="inline-block"
                text="Cancel"
                mode={ButtonMode.SECONDARY}
                onClick={() => {
                    if(onCancel) { onCancel()}
                }}
            />
        </div>
    </div>
}