import { useState } from "react"
import { IClient } from "../api/Client"
import { SpendingsSummary } from "../models/SpendingsSummary"

interface SpendingsSummaryViewProps {
    client: IClient,
    date: Date
}

export function SpendingsSummaryView(props: SpendingsSummaryViewProps) {
    const { client, date } = props
    const [report, setReport] = useState<SpendingsSummary | undefined>(undefined)
    if(report === undefined) {
        (async () => {
            const retrievedReport = await client.GetSpendingsSummary(date)
            setReport(retrievedReport)
        })()
    }
    return <div data-testid="spendings-summary">
        <h3>Spendings</h3>
        {report ?
            <>
                <div data-testId="amount-spent-today">Today: {report.amountSpentToday}</div>
                <div data-testId="amount-spent-this-week">This week: {report.amountSpentThisWeek}</div>
                <div data-testId="amount-spent-this-month">This month: {report.amountSpentThisMonth}</div>
                <div data-testId="amount-spent-this-year">This year: {report.amountSpentThisYear}</div>
            </>
            :<></>
        }
    </div>
}