import { IClient } from "./api/Client"
import { DayView } from "./DayView"
import "./MainView.css"

export interface MainViewProps {
  client: IClient
  onLogout: () => void
}

export function MainView({client, onLogout} : MainViewProps) {
    return <div data-testid="main-view" className="col-12">
      <div className="row">
        <button className="selected btn btn-info">Day</button>
      </div>
      <DayView client={client} initialDate={new Date()} />
      <div className="row">
        <button className="btn btn-danger col-1" onClick={() => onLogout()}>Log out</button>
      </div>
    </div>
}