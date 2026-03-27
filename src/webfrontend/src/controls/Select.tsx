
export interface SelectOption {
    value: string | undefined
    text: string
}
interface SelectProps {
    value: string
    onChange?: (newValue: string) => void
    options: SelectOption[]
    label: string
    elementId: string
}

export function Select(props: SelectProps) {
    const { value, onChange, options, label, elementId } = props
    return <div>
            <label htmlFor={elementId} className="block text-sm/6 font-semibold text-gray-900">{label}</label>
            <select id={elementId} 
                className={"block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 " +
                        "outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 "}
                value={value} 
                onChange={event => {
                    if(onChange !== undefined) {
                        onChange(event.target.value)
                    }
                }}
            >
                {(options || []).map(option => (
                    <option key={option.value} value={option.value}>{option.text}</option>
                ))}
            </select>
    </div>
}