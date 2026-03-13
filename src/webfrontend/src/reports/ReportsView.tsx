import { IClient } from "../api/Client"
import { Button } from "../controls/Button"
import { MonthlyReportView } from "./MonthlyReportView"

interface ReportsViewProps {
    client: IClient
}

export function ReportsView(_: ReportsViewProps) {
    return <div data-testid="reports-view">
        <Button text="Monthly"/>
        <MonthlyReportView />
    </div>
}