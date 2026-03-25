import { IClient } from "../api/Client"
import { Button } from "../controls/Button"
import { MonthlyReportView } from "./MonthlyReportView"

interface ReportsViewProps {
    client: IClient
}

export function ReportsView(props: ReportsViewProps) {
    const { client } = props
    return <div data-testid="reports-view">
        <Button text="Monthly" />
        <Button text="Yearly" />
        <MonthlyReportView month={new Date()} client={client} />
    </div>
}