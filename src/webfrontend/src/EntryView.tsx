export interface EntryProps {
    title: string
    value: number
}

export const EntryView = ({title, value}: EntryProps) => {
    return <div data-testid="entry">
        <div data-testid="title">{title}</div>
        <div data-testid="value">{value}</div>
    </div>
}