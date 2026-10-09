import { useState } from "react"
import { IClient } from "../api/Client"
import { Select } from "../controls/Select"
import { buildYearSelectOptions } from "../controlUtils/SelectUtils"
import { TableFieldValueRow } from "../controls/TableFieldValueRow"
import { YearlyByCategoriesReport } from "../models/YearlyByCategoriesReport"
import { formatMoney } from "../utils"
import { formatCategorySummary } from "../controlUtils/ReportCategoryUtils"

interface YearlyByCatReportViewProps {
    client: IClient
}

export function YearlyByCatReportView(props: YearlyByCatReportViewProps) {
    const { client } = props
    const currentYear = (new Date()).getFullYear()
    const [year, setYear] = useState(currentYear)
    const yearOptions = buildYearSelectOptions(currentYear, 2013)
    const [report, setReport] = useState<YearlyByCategoriesReport | undefined>(undefined)
    if(report === undefined) {
        (async () => {
            setReport(await client.GetYearlyByCategoriesReport(year));
        })()
    }
    return <div data-testId="yearly-by-cat-report-view">
        <Select
                    elementId="year-control"
                    label="Year"
                    options={yearOptions}
                    value={year.toString()}
                    onChange={newYear => {
                        setYear(parseInt(newYear))
                        setReport(undefined)//reload report
                    }}
                />
        {report
            ?<>
                <div data-testid="by-categories" className="mt-5 mb-5">
                    {
                        Object.keys(report.byCategories)
                        .map(catName => <TableFieldValueRow 
                            dataTestId="category-summary"
                            label={catName} 
                            value={formatCategorySummary(report.byCategories[catName])}
                        />)
                    }
                </div>
                <TableFieldValueRow 
                    dataTestId="total-spendings" label="Total spendings"
                    value={formatMoney(report.totalSpendings)} 
                />
                <TableFieldValueRow dataTestId="total-income" label="Total income" 
                    value={formatMoney(report.totalIncome)} />
                <TableFieldValueRow dataTestId="savings" label="Savings" 
                    value={formatMoney(report.savings)} />
            </>
            :<></>
        }
    </div>
}