import { IClient } from "./api/Client"

export interface DayViewProps {
    client: IClient
    date: Date
}

export const DayView = (_: DayViewProps) => {
    return <div data-testid="day-view">
            <div data-testid="entry">
                <div data-testid="value">-120</div>
            </div>
            <div data-testid="entry">Entry 2</div>
        </div>
}