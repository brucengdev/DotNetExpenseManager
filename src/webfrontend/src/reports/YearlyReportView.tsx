import { useState } from "react";
import { Select } from "../controls/Select";

export function YearlyReportView() {
    const [year, setYear] = useState((new Date()).getFullYear())
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