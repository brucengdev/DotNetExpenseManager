import { useState } from "react"
import { IClient } from "../api/Client"
import { SpendingsSummary } from "../models/SpendingsSummary"
import { formatMoney } from "../utils"
import { TableFieldValueRow } from "../controls/TableFieldValueRow"

interface SpendingsSummaryViewProps {
    client: IClient,
    date: Date,
    refreshFlag?: boolean
}

export function SpendingsSummaryView(props: SpendingsSummaryViewProps) {
    const { client, date, refreshFlag } = props
    const [report, setReport] = useState<SpendingsSummary | undefined>(undefined)
    const [currentRefreshFlag, setCurrentRefreshFlag] = useState(refreshFlag)
    if(report === undefined || currentRefreshFlag != refreshFlag) {
        (async () => {
            const retrievedReport = await client.GetSpendingsSummary(date)
            setReport(retrievedReport)
            if(currentRefreshFlag != refreshFlag) { setCurrentRefreshFlag(refreshFlag) }
        })()
    }
    return <div data-testid="spendings-summary">
        <h3>Spendings</h3>
        {report ?
            <div className="xl:mr-150 pb-5 pt-2">
                <TableFieldValueRow dataTestId="amount-spent-today" 
                    label={"Today"} value={formatMoney(report.amountSpentToday)} />
                <TableFieldValueRow dataTestId="amount-spent-this-week" 
                    label={"This week"} value={formatMoney(report.amountSpentThisWeek)} />
                <TableFieldValueRow dataTestId="amount-spent-this-month" 
                    label={"This month"} value={formatMoney(report.amountSpentThisMonth)} />
                <TableFieldValueRow dataTestId="amount-spent-this-year" 
                    label={"This year"} value={formatMoney(report.amountSpentThisYear)} />
            </div>
            :<></>
        }
    </div>
}