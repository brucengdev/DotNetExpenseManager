export interface MonthlyReport {
    byCategories: Record<string, CategorySummary>
    totalSpendings: number
    totalIncome: number
    savings: number
}

export interface CategorySummary {
    Total: number
    ExpensePercentage: number
}