import { Select } from "../controls/Select";

export function YearlyReportView() {
    return <div data-testid="yearly-report-view">
        <Select
            elementId="year-control"
            label="Year"
            options={[]}
            value=""
        />
    </div>
}