
interface TableFieldValueRowProps {
    label: string,
    dataTestId: string,
    value: string
}
export function TableFieldValueRow(props: TableFieldValueRowProps) {
    const { value, dataTestId, label } = props
    return <div key={label} data-testid={dataTestId} className="grid grid-cols-2">
            <div className="bg-blue-400 text-white border-1">{label}</div>
            <div className="border-1">{value}</div>
        </div>
}