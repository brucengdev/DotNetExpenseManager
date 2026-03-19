import { useState } from "react"
import { IClient } from "../api/Client"
import { formatDateToMonthYear, formatMoney } from "../utils"
import { MonthlyReport } from "../models/MonthlyReport"
import { TextBox } from "../controls/TextBox"

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
            className="lg:mx-50"
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
                        .map(catName => <TableEntry 
                            dataTestId="category-summary"
                            label={catName} 
                            value={reportData.byCategories[catName]}
                        />)
                    }
                </div>
                <TableEntry dataTestId="total-spendings" label="Total spendings" value={reportData.totalSpendings} />
                <TableEntry dataTestId="total-income" label="Total income" value={reportData.totalIncome} />
                <TableEntry dataTestId="savings" label="Savings" value={reportData.savings} />
            </div>
            :<></>
        }
    </div>
}

interface CategorySummaryProps {
    label: string,
    dataTestId: string,
    value: number
}
function TableEntry(props: CategorySummaryProps) {
    const { value, dataTestId, label } = props
    return <div key={label} data-testid={dataTestId} className="grid grid-cols-2">
            <div className="bg-blue-400 text-white border-1">{label}</div>
            <div className="border-1">{formatMoney(value)}</div>
        </div>
}