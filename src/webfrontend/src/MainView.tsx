import { IClient } from "./api/Client"
import { Button, ButtonMode } from "./controls/Button"
import { DayView } from "./DayView"

export interface MainViewProps {
  client: IClient
  onLogout: () => void
}

export function MainView({client, onLogout} : MainViewProps) {
    return <div data-testid="main-view" className="row-auto">
      <div className="mb-5">
        <Button text="Day" mode={ButtonMode.PRIMARY}/>
      </div>
        <DayView client={client} initialDate={new Date()} />
      <Button 
        text="Log out"
        onClick={() => onLogout()}
      />
    </div>
}