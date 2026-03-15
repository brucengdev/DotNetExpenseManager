
export function MonthlyReportView() {
    return <div data-testid="monthly-report-view">
        Monthly Report
        <div>
            <label htmlFor="month-control">Month</label>
            <input id="month-control" type="month" />
        </div>
    </div>
}