import { IClient } from "./api/Client";
import { CategoryControl } from "./controls/CategoryControl";
import { LabeledMultiSelect } from "./controls/LabeledMultiSelect";
import { TextBox } from "./controls/TextBox";

interface EntryFiltersViewProps {
    client: IClient
}

export function EntryFiltersView(props: EntryFiltersViewProps) {
    const { client } = props
    return <div data-testId="entry-filters-view">
        <TextBox
            label="From date"
            name="from-date-field"
            type="date"
            value=""
        />
        <TextBox
            label="To date"
            name="to-date-field"
            type="date"
            value=""
        />
        <CategoryControl 
            client={client}
            categoryId={undefined}
            onChange={() => {}}
            />
        <LabeledMultiSelect
            label="Tags"
            selectDataTestId="tags-control"
            options={[]}
            selectedValues={[]}
        />
    </div>
}