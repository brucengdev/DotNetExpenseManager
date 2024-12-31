import "./MainView.css"

export function MainView() {
    return <div data-testid="main-view">
      <button className="selected">Day</button>
      <div data-testid="day-view"></div>
      <button>Log out</button>
    </div>
}