import { useState } from "react"
import { IClient } from "../api/Client"
import { formatDateToMonthYear } from "../utils"

interface MonthlyReportViewProps {
    month: Date,
    client: IClient
}

export function MonthlyReportView(props: MonthlyReportViewProps) {
    const { month: initialMonth } = props
    const [ month, setMonth ] = useState(initialMonth)
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
    </div>
}