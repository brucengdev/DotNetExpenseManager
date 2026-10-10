import { CategorySummary } from "../models/MonthlyReport"
import { formatMoney, formatPercentage } from "../utils"


export const formatCategorySummary = (summary: CategorySummary) => {
    let result = formatMoney(summary.totalExpenses)
    if(summary.totalExpenses < 0) {
        result += ` (${formatPercentage(summary.expensePercentage)})`
    }
    if(summary.totalIncome > 0) {
        result += `, ${formatMoney(summary.totalIncome)}`
    }
    return result
}