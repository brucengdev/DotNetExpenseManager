import { useState } from "react";
import { Select, SelectOption } from "../controls/Select";
import { IClient } from "../api/Client";
import { YearlyReport } from "../models/YearlyReport";
import { MonthSummaryView } from "./MonthSummaryView";
import { TableFieldValueRow } from "../controls/TableFieldValueRow";
import { formatMoney } from "../utils";

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
                setYearlyReport(undefined)//to reload
            }}
        />
        <div className="grid grid-cols-4">
            <div className="border-1">Month</div>
            <div className="border-1">Spendings</div>
            <div className="border-1">Income</div>
            <div className="border-1">Savings</div>
        </div>
        {
            (yearlyReport?.months ?? [])
            .map(({income, month, savings, spendings}) => 
                <MonthSummaryView month={month} spendings={spendings} savings={savings} income={income}/>)
        }

        {
            yearlyReport
            ? <>
                <TableFieldValueRow dataTestId="total-spendings" label="Total spendings" value={formatMoney(yearlyReport.totalSpendings)} />
                <TableFieldValueRow dataTestId="total-income" label="Total income" value={formatMoney(yearlyReport.totalIncome)} />
                <TableFieldValueRow dataTestId="total-savings" label="Total savings" value={formatMoney(yearlyReport.totalSavings)} />
            </>
            :<></>
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
