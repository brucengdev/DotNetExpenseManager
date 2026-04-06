import { MultiSelect, Option } from "./MultiSelect"

interface LabeledMutliSelectProps {
    onChange?: (values: string[]) => void
    options: Option[]
    selectedValues: string[]
    selectDataTestId?: string
}

export function LabeledMultiSelect(props: LabeledMutliSelectProps) {
    const { options, selectedValues, selectDataTestId, onChange } = props
    return <div>
        <label htmlFor="tags-control" className="block text-sm/6 font-semibold text-gray-900">Tags</label>
        <MultiSelect
            selectDataTestId={selectDataTestId}
            options={options}
            selectedValues={selectedValues}
            onChange={onChange}
        />
    </div>
}