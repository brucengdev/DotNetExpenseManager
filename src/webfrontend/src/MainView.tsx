import "./MainView.css"

export function MainView() {
    return <>
      <h1>Expenses</h1>
      <button className="selected">Day</button>
      <div data-testid="day-view"></div>
    </>
}