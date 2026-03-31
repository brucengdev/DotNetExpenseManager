import { Client } from "./api/Client";
import { TextBox } from "./controls/TextBox";

interface EntryFiltersViewProps {
    client: Client
}

export function EntryFiltersView(_: EntryFiltersViewProps) {
    return <div data-testId="entry-filters-view">
        <TextBox
            label="From date"
            name="from-date-field"
            type="date"
            value=""
        />
    </div>
}