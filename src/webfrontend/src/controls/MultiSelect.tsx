
interface Option {
    value: string
    text: string
}
export interface MultiSelectProps {
    onChange?: (values: string[]) => void
    options: Option[]
    selectedValues: string[]
    selectDataTestId?: string
}
export function MultiSelect(props: MultiSelectProps) {
    const { onChange, options, selectedValues, selectDataTestId } = props
    return <select 
                className="border border-gray-300 block w-full"
                data-testId={selectDataTestId}
                multiple
                onChange={e => {
                    if(onChange) {
                        onChange(getSelectedValues(e))
                    }
            }}>
                {options.map(t => <option 
                    value={t.value} 
                    selected={selectedValues.includes(t.value)}
                >{t.text}</option>)}
            </select>
}

function getSelectedValues(e: React.ChangeEvent<HTMLSelectElement>) {
    const options = e.target.options
    const values = []
    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            values.push(options[i].value)
        }
    }
    return values
}
