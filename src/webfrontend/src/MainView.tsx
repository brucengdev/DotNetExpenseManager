import { IClient } from "./api/Client"
import { DayView } from "./DayView"
import "./MainView.css"

export interface MainViewProps {
  client: IClient
  onLogout: () => void
}

export function MainView({client, onLogout} : MainViewProps) {
    return <div data-testid="main-view">
      <button className="selected btn btn-info">Day</button>
      <DayView client={client} initialDate={new Date()} />
      <button className="btn btn-danger" onClick={() => onLogout()}>Log out</button>
    </div>
}