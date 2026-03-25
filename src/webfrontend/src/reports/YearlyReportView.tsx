import { useState } from "react";
import { Select } from "../controls/Select";

interface YearlyReportViewProps {
    year?: number
}
export function YearlyReportView(props: YearlyReportViewProps) {
    const { year: initialYear } = props
    const [year, setYear] = useState(initialYear ?? (new Date()).getFullYear())
    return <div data-testid="yearly-report-view">
        <Select
            elementId="year-control"
            label="Year"
            options={[
                { value: year.toString(), text: year.toString() }
            ]}
            value={year.toString()}
        />
    </div>
}