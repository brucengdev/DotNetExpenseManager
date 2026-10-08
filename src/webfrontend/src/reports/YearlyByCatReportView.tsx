import { useState } from "react"
import { IClient } from "../api/Client"
import { Select } from "../controls/Select"
import { buildYearSelectOptions } from "../controlUtils/SelectUtils"

interface YearlyByCatReportViewProps {
    client: IClient
}

export function YearlyByCatReportView(props: YearlyByCatReportViewProps) {
    const currentYear = (new Date()).getFullYear()
    const [year, setYear] = useState(currentYear)
    const yearOptions = buildYearSelectOptions(currentYear, 2013)
    return <div data-testId="yearly-by-cat-report-view">
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