import { DayView } from "./DayView"
import "./MainView.css"

export function MainView() {
    return <div data-testid="main-view">
      <button className="selected">Day</button>
      <DayView />
      <button>Log out</button>
    </div>
}