import { useState } from "react"
import { IClient } from "../api/Client"
import { Button, ButtonMode } from "../controls/Button"
import { MonthlyReportView } from "./MonthlyReportView"
import { YearlyReportView } from "./YearlyReportView"

interface ReportsViewProps {
    client: IClient
}

enum CurrentReportView {
    MONTHLY,
    YEARLY
}

export function ReportsView(props: ReportsViewProps) {
    const { client } = props
    const [currentView, setCurrentView] = useState(CurrentReportView.MONTHLY)
    return <div data-testid="reports-view">
        <Button text="Monthly" mode={currentView == CurrentReportView.MONTHLY? ButtonMode.PRIMARY: ButtonMode.SECONDARY} 
            onClick={() => setCurrentView(CurrentReportView.MONTHLY)}
        />
        <Button text="Yearly" mode={currentView == CurrentReportView.YEARLY? ButtonMode.PRIMARY: ButtonMode.SECONDARY}
            onClick={() => setCurrentView(CurrentReportView.YEARLY)}
        />
        {
            currentView == CurrentReportView.MONTHLY
            ? <MonthlyReportView month={new Date()} client={client} />
            : <YearlyReportView client={client} />
        }
    </div>
}