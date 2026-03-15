import { useState } from "react"
import { IClient } from "../api/Client"
import { formatDateToMonthYear } from "../utils"
import { MonthlyReport } from "../models/MonthlyReport"

interface MonthlyReportViewProps {
    month: Date,
    client: IClient
}

export function MonthlyReportView(props: MonthlyReportViewProps) {
    const { month: initialMonth, client } = props
    const [ month, setMonth ] = useState(initialMonth);
    const [ reportData, setReportData] = useState<MonthlyReport | undefined>(undefined);
    if(reportData == undefined) {
        (async () => {
            const retrievedReport = await client.GetMonthlyReport(month)
            setReportData(retrievedReport)
        })();
    }
    return <div data-testid="monthly-report-view">
        Monthly Report
        <div>
            <label htmlFor="month-control">Month</label>
            <input 
                id="month-control" 
                type="month" 
                value={formatDateToMonthYear(month)}
                onChange={e => setMonth(new Date(e.target.value))}
            />
        </div>
        {
            reportData
            ? <>
                <div data-testid="total-spendings">{reportData.TotalSpendings}</div>
            </>
            :<></>
        }
    </div>
}