import { IClient } from "./api/Client"
import { Button } from "./controls/Button"
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
      <Button 
        text="Log out"
        onClick={() => onLogout()}
      />
    </div>
}