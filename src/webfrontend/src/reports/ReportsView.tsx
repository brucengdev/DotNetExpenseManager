import { IClient } from "../api/Client"
import { Button } from "../controls/Button"

interface ReportsViewProps {
    client: IClient
}

export function ReportsView(_: ReportsViewProps) {
    return <div data-testid="reports-view">
        <Button text="Monthly"/>
    </div>
}