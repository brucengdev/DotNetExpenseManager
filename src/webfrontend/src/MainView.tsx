import { IClient } from "./api/Client"
import { DayView } from "./DayView"
import "./MainView.css"

export interface MainViewProps {
  client: IClient
  onLogout: () => void
}

export function MainView({client, onLogout} : MainViewProps) {
    return <div data-testid="main-view" className="row">
      <div className="row">
        <button className="selected btn btn-info col-2">Day</button>
      </div>
      <div className="row">
        <DayView client={client} initialDate={new Date()} />
      </div>
      <div className="row">
        <button className="btn btn-danger col-2" onClick={() => onLogout()}>Log out</button>
      </div>
    </div>
}