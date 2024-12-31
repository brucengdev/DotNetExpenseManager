import "./MainView.css"

export function MainView() {
    return <>
      <h1>Expenses</h1>
      <button className="selected">Day</button>
      <button>Month</button>
      <button>Year</button>
      <button>Log</button>
    </>
}