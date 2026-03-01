import { useState } from "react"
import { IClient } from "./api/Client"
import { Button, ButtonMode } from "./controls/Button"
import { DayView } from "./DayView"
import { TagsView } from "./TagsView"
import { PayeesView } from "./PayeesView"

export interface MainViewProps {
  client: IClient
  onLogout: () => void
}

enum View {
  DAY,
  TAGS,
  PAYEES
}

export function MainView({client, onLogout} : MainViewProps) {
    const [view, setView] = useState<View>(View.DAY)
    return <div data-testid="main-view" className="row-auto">
      <div className="mx-auto max-w-2xl grid grid-cols-4 gap-4 mb-5">
        <div></div>
        <h2 className="text-2xl font-semibold text-gray-900">Expenses</h2>
        <Button 
          text="Log out"
          onClick={() => onLogout()}
        />
      </div>
      <div className="mb-5 grid grid-cols-3 gap-2">
        <Button text="Day" mode={ButtonMode.PRIMARY} onClick={() => setView(View.DAY)}/>
        <Button text="Tags" mode={ButtonMode.PRIMARY} onClick={() => setView(View.TAGS)}/>
        <Button text="Payees" mode={ButtonMode.PRIMARY} onClick={() => setView(View.PAYEES)}/>
      </div>
        {view === View.DAY? <DayView client={client} initialDate={new Date()} />: <></>}
        {view === View.TAGS? <TagsView client={client} />: <></>}
        {view === View.PAYEES? <PayeesView client={client}/>:<></>}
    </div>
}