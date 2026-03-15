export interface MonthlyReport {
    byCategories: Record<string, number>
    totalSpendings: number
    totalIncome: number
    savings: number
}