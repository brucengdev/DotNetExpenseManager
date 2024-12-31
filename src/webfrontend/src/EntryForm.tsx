export interface EntryFormProps {
    date: Date
}
export const EntryForm = ({date}: EntryFormProps) => {
    return <div data-testid="entry-form">
        <label>
            Title
            <input type="text" />
        </label>
        <label>
            Value
            <input type="number" />
        </label>
        <label>
            Date
            <input type="date" value={date.toISOString()} />
        </label>
        <button>Save</button>
    </div>
}