import { IClient } from "../api/Client"
import { Button, ButtonMode } from "../controls/Button"
import { MonthlyReportView } from "./MonthlyReportView"

interface ReportsViewProps {
    client: IClient
}

export function ReportsView(props: ReportsViewProps) {
    const { client } = props
    return <div data-testid="reports-view">
        <Button text="Monthly" mode={ButtonMode.PRIMARY} />
        <Button text="Yearly" mode={ButtonMode.SECONDARY} />
        <MonthlyReportView month={new Date()} client={client} />
    </div>
}