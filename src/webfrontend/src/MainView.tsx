import "./MainView.css"

export function MainView() {
    return <>
      <h1>Expenses</h1>
      <button className="selected">Today</button>
      <button>This month</button>
      <button>Year</button>
    </>
}