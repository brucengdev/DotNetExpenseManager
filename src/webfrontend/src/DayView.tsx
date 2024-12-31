import { IClient } from "./api/Client"

export interface DayViewProps {
    client: IClient
}

export const DayView = ({client}: DayViewProps) => {
    return <div data-testid="day-view">
            Day view
        </div>
}