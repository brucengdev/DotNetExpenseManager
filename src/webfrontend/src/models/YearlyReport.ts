
export interface MonthSummary {
    month: number
    spendings: number
    income: number
    savings: number
}
export interface YearlyReport {
    year: number
    months: MonthSummary[]
}