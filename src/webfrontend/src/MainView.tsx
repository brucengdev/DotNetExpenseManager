import "./MainView.css"

export function MainView() {
    return <div data-testid="main-view">
      <h1>Expenses</h1>
      <button className="selected">Day</button>
      <div data-testid="day-view"></div>
    </div>
}