import { useState } from "react"
import { IClient } from "../api/Client"
import { Button, ButtonMode } from "../controls/Button"
import { MonthlyReportView } from "./MonthlyReportView"
import { YearlyByMonthReportView } from "./YearlyByMonthReportView"
import { YearlyByCatReportView } from "./YearlyByCatReportView"

interface ReportsViewProps {
    client: IClient
}

enum CurrentReportView {
    MONTHLY,
    YEARLY,
    YEARLY_BY_CAT
}

export function ReportsView(props: ReportsViewProps) {
    const { client } = props
    const [currentView, setCurrentView] = useState(CurrentReportView.MONTHLY)
    return <div data-testid="reports-view">
        <div className="grid grid-cols-2 xl:mx-30 mx-2">
            <Button text="Monthly" mode={currentView == CurrentReportView.MONTHLY? ButtonMode.PRIMARY: ButtonMode.SECONDARY} 
                onClick={() => setCurrentView(CurrentReportView.MONTHLY)}
            />
            <Button text="Yearly by month" mode={currentView == CurrentReportView.YEARLY? ButtonMode.PRIMARY: ButtonMode.SECONDARY}
                onClick={() => setCurrentView(CurrentReportView.YEARLY)}
            />
            <Button text="Yearly by categories" mode={currentView === CurrentReportView.YEARLY_BY_CAT? ButtonMode.PRIMARY: ButtonMode.SECONDARY }
                onClick={() => setCurrentView(CurrentReportView.YEARLY_BY_CAT)}
            />
        </div>
        {
            ShowReport(currentView, client)
        }
    </div>
}

function ShowReport(currentView: CurrentReportView, client: IClient) {
    switch(currentView) {
        case CurrentReportView.YEARLY_BY_CAT: return <YearlyByCatReportView client={client} />
        case CurrentReportView.YEARLY: return <YearlyByMonthReportView client={client} />
        default:
        case CurrentReportView.MONTHLY: return <MonthlyReportView month={new Date()} client={client} />;
    }
}