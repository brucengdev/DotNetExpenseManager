import "./EntryView.css"

export interface EntryProps {
    title: string
    value: number
}

export const EntryView = ({title, value}: EntryProps) => {
    return <div data-testid="entry">
        <div className="col entryLabel" data-testid="title">{title}</div>
        <div className="col" data-testid="value">{value}</div>
    </div>
}