import { IClient } from "./api/Client"
import { Button } from "./controls/Button"
import { DayView } from "./DayView"
import "./MainView.css"

export interface MainViewProps {
  client: IClient
  onLogout: () => void
}

export function MainView({client, onLogout} : MainViewProps) {
    return <div data-testid="main-view" className="row-auto">
      <div>
        <Button extraClasses="selected" text="Day" />
      </div>
        <DayView client={client} initialDate={new Date()} />
      <Button 
        text="Log out"
        onClick={() => onLogout()}
      />
    </div>
}