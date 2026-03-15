export interface MonthlyReport {
    ByCategories: Record<string, number>
    TotalSpendings: number
    TotalIncome: number
    Savings: number
}