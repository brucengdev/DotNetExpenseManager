import { useState } from "react"
import { IClient } from "../api/Client"
import { formatDateToMonthYear, formatMoney } from "../utils"
import { MonthlyReport } from "../models/MonthlyReport"

interface MonthlyReportViewProps {
    month: Date,
    client: IClient
}

export function MonthlyReportView(props: MonthlyReportViewProps) {
    const { month: initialMonth, client } = props
    const [ month, setMonth ] = useState(initialMonth);
    const [ reportData, setReportData] = useState<MonthlyReport | undefined>(undefined);
    if(reportData == undefined) {
        (async () => {
            const retrievedReport = await client.GetMonthlyReport(month)
            setReportData(retrievedReport)
        })();
    }
    return <div data-testid="monthly-report-view">
        Monthly Report
        <div>
            <label htmlFor="month-control" className="mr-5">Month</label>
            <input 
                id="month-control" 
                type="month" 
                value={formatDateToMonthYear(month)}
                onChange={
                    e => { 
                        setMonth(new Date(e.target.value))
                        setReportData(undefined)//to reload
                    }
                }
            />
        </div>
        {
            reportData
            ? <>
                <div data-testid="by-categories" className="mt-5 mb-5">
                    {
                        Object.keys(reportData.byCategories)
                        .map(catName => <CategorySummary 
                            catName={catName} 
                            value={reportData.byCategories[catName]}
                        />)
                    }
                </div>
                <div data-testid="total-spendings">Total spendings: {formatMoney(reportData.totalSpendings)}</div>
                <div data-testid="total-income">Total income: {formatMoney(reportData.totalIncome)}</div>
                <div data-testid="savings">Savings: {formatMoney(reportData.savings)}</div>
            </>
            :<></>
        }
    </div>
}

function CategorySummary(props: {catName: string, value: number}) {
    const { catName, value } = props
    return <div key={catName} data-testid="category-summary">
            {catName}: {formatMoney(value)}
        </div>
}