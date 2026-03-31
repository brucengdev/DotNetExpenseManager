import { TextBox } from "./controls/TextBox";

export function EntryFiltersView() {
    return <div data-testId="entry-filters-view">
        <TextBox
            label="From date"
            name="from-date-field"
            type="date"
            value=""
        />
    </div>
}