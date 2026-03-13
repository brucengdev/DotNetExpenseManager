import { IClient } from "../api/Client"

interface ReportsViewProps {
    client: IClient
}

export function ReportsView(_: ReportsViewProps) {
    return <div data-testid="reports-view" />
}