import { useState } from "react";
import { Select, SelectOption } from "../controls/Select";
import { IClient } from "../api/Client";

interface YearlyReportViewProps {
    client: IClient
}

export function YearlyReportView(_: YearlyReportViewProps) {
    const currentYear = (new Date()).getFullYear()
    const [year, setYear] = useState(currentYear)
    const yearOptions: SelectOption[] = buildYearOptions(currentYear, 2013);
    return <div data-testid="yearly-report-view">
        <Select
            elementId="year-control"
            label="Year"
            options={yearOptions}
            value={year.toString()}
            onChange={newYear => {
                setYear(parseInt(newYear))
            }}
        />
    </div>
}

function buildYearOptions(currentYear: number, oldestYear: number) {
    const yearOptions: SelectOption[] = [];
    for (let year = currentYear; year >= oldestYear; year--) {
        yearOptions.push({
            value: year.toString(),
            text: year.toString()
        });
    }
    return yearOptions;
}
