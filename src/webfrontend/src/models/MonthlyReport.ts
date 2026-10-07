export interface MonthlyReport {
    byCategories: Record<string, CategorySummary>
    totalSpendings: number
    totalIncome: number
    savings: number
}

export interface CategorySummary {
    totalExpenses: number
    totalIncome: number
    expensePercentage: number
}