import { IClient } from "./api/Client"
import { Entry } from "./EntryView"

export interface DayViewProps {
    client: IClient
    date: Date
}

export const DayView = (_: DayViewProps) => {
    return <div data-testid="day-view">
            <Entry title="grocery" value={-120} />
            <Entry title="eat out" value={-65} />
        </div>
}