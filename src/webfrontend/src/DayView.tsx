import { IClient } from "./api/Client"

export interface DayViewProps {
    client: IClient
    date: Date
}

export const DayView = (_: DayViewProps) => {
    return <div data-testid="day-view">
            Day view
        </div>
}