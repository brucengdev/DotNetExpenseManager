export const EntryForm = () => {
    return <div data-testid="entry-form">
        <label>
            Title
            <input type="text" />
        </label>
        <label>
            Value
            <input type="number" />
        </label>
        <button>Save</button>
    </div>
}