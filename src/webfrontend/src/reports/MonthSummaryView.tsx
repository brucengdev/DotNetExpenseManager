import { formatMoney } from "../utils"

interface MonthSummaryViewProps {
    month: number
    spendings: number
    income: number
    savings: number
}

export function MonthSummaryView({month, spendings, income, savings}: MonthSummaryViewProps) {
    return <div data-testId="month-summary" className="grid grid-cols-4">
        <div className="bg-blue-400 text-white border-1">{month.toString().padStart(2, "0")}</div>
        <div className="border-1">{formatMoney(spendings)}</div>
        <div className="border-1">{formatMoney(income)}</div>
        <div className="border-1">{formatMoney(savings)}</div>
    </div>
}