import { IClient } from "../api/Client"
import { Select } from "../controls/Select"

interface YearlyByCatReportViewProps {
    client: IClient
}

export function YearlyByCatReportView(props: YearlyByCatReportViewProps) {
    return <div data-testId="yearly-by-cat-report-view">
        <Select
                    elementId="year-control"
                    label="Year"
                    options={yearOptions}
                    value={year.toString()}
                    onChange={newYear => {
                        setYear(parseInt(newYear))
                        setYearlyReport(undefined)//to reload
                    }}
                />
    </div>
}