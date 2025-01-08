import "./EntryView.css"

export interface EntryProps {
    title: string
    value: number,
    onDelete?: () => void
}

export const EntryView = ({title, value, onDelete}: EntryProps) => {
    return <div data-testid="entry">
        <div className="col entryLabel" data-testid="title">{title}</div>
        <div className="col" data-testid="value">{value}</div>
        {onDelete? <button onClick={onDelete}>X</button>: <></>}
    </div>
}