import { useState } from "react";
import { IClient } from "./api/Client";
import { LabeledMultiSelect } from "./controls/LabeledMultiSelect";
import { TextBox } from "./controls/TextBox";
import { Tag } from "./models/Tag";
import { Payee } from "./models/Payee";
import { Category } from "./models/Category";
import { Entry } from "./models/Entry";

interface EntryFiltersViewProps {
    client: IClient
}

export function EntryFiltersView(props: EntryFiltersViewProps) {
    const { client } = props
    const [categoryIds, setCategoryIds] = useState<number[]>([])
    const [tags, setTags] = useState<Tag[] | undefined>(undefined)
    const [payees, setPayees] = useState<Payee[] | undefined>(undefined)
    const [tagIds, setTagIds] = useState<number[]>([])
    const [payeeIds, setPayeeIds] = useState<number[]>([])
    const [categories, setCategories] = useState<Category[] | undefined>(undefined)
    const [fromDate, setFromDate] = useState("")
    const [toDate, setToDate] = useState("")
    const [entries, setEntries] = useState<Entry[] | undefined>(undefined)
    if(tags === undefined) {
        client.GetTags()
        .then(retrievedTags => setTags(retrievedTags))
    }
    if(payees === undefined) {
        client.GetPayees()
        .then(retrievedPayees => setPayees(retrievedPayees))
    }
    if(categories == undefined) {
        client.GetCategories()
        .then(retrievedCats => setCategories(retrievedCats))
    }
    if(entries === undefined) {
        client.GetEntries(
            fromDate? new Date(fromDate): undefined,
            toDate? new Date(toDate): undefined,
            categoryIds, 
            tagIds, 
            [])
    }

    const sortedCats = SortedCategories(categories || [])
    const sortedTags = (tags || []).sort((a, b) => a.name.localeCompare(b.name))
    const sortedPayees = (payees || []).sort((a, b) => a.name.localeCompare(b.name));

    return <div data-testId="entry-filters-view">
        <TextBox
            label="From date"
            name="from-date-field"
            type="date"
            value={fromDate}
            onChange={e => {
                setFromDate(e.target.value)
                setEntries(undefined)
            }}
        />
        <TextBox
            label="To date"
            name="to-date-field"
            type="date"
            value={toDate}
            onChange={e => {
                setToDate(e.target.value)
            }}
        />
        <LabeledMultiSelect
            selectDataTestId="category-control"
            selectedValues={categoryIds.map(cId => cId.toString())}
            label="Categories"
            options={
                sortedCats.map(sc => {
                    return {
                        text: sc.name,
                        value: sc.id.toString()
                    }
                })
            }
            onChange={selectedValues => {
                setCategoryIds(selectedValues.map(catIdStr => parseInt(catIdStr)))
                setEntries(undefined)
            }}
        />
        <LabeledMultiSelect
            label="Tags"
            selectDataTestId="tags-control"
            options={sortedTags.map(st => {
                return {
                    value: st.id.toString(),
                    text: st.name
                }
            })}
            selectedValues={tagIds.map(t => t.toString())}
            onChange={newSelectedValues => {
                setTagIds(newSelectedValues.map(tIdStr => parseInt(tIdStr)))
                setEntries(undefined)
            }}
        />
        <LabeledMultiSelect
            selectDataTestId="payee-select"
            label="Payees"
            selectedValues={payeeIds.map(p => p.toString())}
            onChange={newValues => {
                setPayeeIds(newValues.map(v => parseInt(v)))
            }}

            options={[{ value: "0", text: "[No payee]"}]
            .concat(
                sortedPayees.map(p => {
                    return { value: p.id.toString(), text: p.name }
                })
            )}
        />
    </div>
}

function SortedCategories(cats: Category[]) {
    const uncategorized = cats.find(c => c.id === 1)
    let result = []
    if(uncategorized) {
        result.push(uncategorized)
    }
    result = [
        ...result,
        ...cats.filter(c => c.id !== 1).sort((a, b) => a.name.localeCompare(b.name))
    ]
    return result
}