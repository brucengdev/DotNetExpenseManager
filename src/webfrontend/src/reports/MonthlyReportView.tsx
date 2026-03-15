import { formatDateToMonthYear } from "../utils"

interface MonthlyReportViewProps {
    month: Date
}

export function MonthlyReportView(props: MonthlyReportViewProps) {
    const { month } = props
    return <div data-testid="monthly-report-view">
        Monthly Report
        <div>
            <label htmlFor="month-control">Month</label>
            <input id="month-control" type="month" value={formatDateToMonthYear(month)}/>
        </div>
    </div>
}