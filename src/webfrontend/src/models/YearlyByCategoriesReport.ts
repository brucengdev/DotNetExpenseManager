import { CategorySummary } from "./MonthlyReport"

export interface YearlyByCategoriesReport {
    //reuse CategorySummary
    byCategories: Record<string, CategorySummary>
    totalSpendings: number
    totalIncome: number
    savings: number
}