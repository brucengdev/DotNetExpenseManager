import { useState } from "react";
import { Select, SelectOption } from "../controls/Select";
import { IClient } from "../api/Client";
import { YearlyReport } from "../models/YearlyReport";
import { MonthSummaryView } from "./MonthSummaryView";

interface YearlyReportViewProps {
    client: IClient
}

export function YearlyReportView(props: YearlyReportViewProps) {
    const { client } = props
    const currentYear = (new Date()).getFullYear()
    const [year, setYear] = useState(currentYear)
    const yearOptions: SelectOption[] = buildYearOptions(currentYear, 2013);
    const [yearlyReport, setYearlyReport] = useState<YearlyReport | undefined>(undefined)
    if(yearlyReport == undefined) {
        (async () => {
            const retrievedReport = await client.GetYearlyReport(year)
            setYearlyReport(retrievedReport)
        })()
    }
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
        {
            (yearlyReport?.months ?? [])
            .map(monthSummary => <MonthSummaryView />)
        }
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
