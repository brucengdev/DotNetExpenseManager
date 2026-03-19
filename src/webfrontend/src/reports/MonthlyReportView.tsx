import { useState } from "react"
import { IClient } from "../api/Client"
import { formatDateToMonthYear, formatMoney } from "../utils"
import { MonthlyReport } from "../models/MonthlyReport"
import { TextBox } from "../controls/TextBox"
import { TableFieldValueRow } from "../controls/TableFieldValueRow"

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
    return <div 
            className="xl:mx-50"
            data-testid="monthly-report-view">
        Monthly Report
        <TextBox
            name="month"
            label="Month"
            type="month"
            value={formatDateToMonthYear(month)}
            onChange={
                e => { 
                    setMonth(new Date(e.target.value))
                    setReportData(undefined)//to reload
                }
            }
            />
        {
            reportData
            ? <div>
                <div data-testid="by-categories" className="mt-5 mb-5">
                    {
                        Object.keys(reportData.byCategories)
                        .map(catName => <TableFieldValueRow 
                            dataTestId="category-summary"
                            label={catName} 
                            value={formatMoney(reportData.byCategories[catName])}
                        />)
                    }
                </div>
                <TableFieldValueRow dataTestId="total-spendings" label="Total spendings" value={formatMoney(reportData.totalSpendings)} />
                <TableFieldValueRow dataTestId="total-income" label="Total income" value={formatMoney(reportData.totalIncome)} />
                <TableFieldValueRow dataTestId="savings" label="Savings" value={formatMoney(reportData.savings)} />
            </div>
            :<></>
        }
    </div>
}