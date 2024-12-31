import { IClient } from "./api/Client"
import { DayView } from "./DayView"
import "./MainView.css"

export interface MainViewProps {
  client: IClient
}

export function MainView({client} : MainViewProps) {
    return <div data-testid="main-view">
      <button className="selected">Day</button>
      <DayView client={client} date={new Date()} />
      <button>Log out</button>
    </div>
}