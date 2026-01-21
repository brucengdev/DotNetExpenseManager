import { useState } from "react"
import { IClient } from "./api/Client"
import { Button, ButtonMode } from "./controls/Button"
import { DayView } from "./DayView"
import { TagsView } from "./TagsView"

export interface MainViewProps {
  client: IClient
  onLogout: () => void
}

enum View {
  DAY,
  TAGS
}

export function MainView({client, onLogout} : MainViewProps) {
    const [view, setView] = useState<View>(View.DAY)
    return <div data-testid="main-view" className="row-auto">
      <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold text-gray-900">Expenses</h2>
      </div>
      <div className="mb-5">
        <Button text="Day" mode={ButtonMode.PRIMARY} onClick={() => setView(View.DAY)}/>
        <Button text="Tags" mode={ButtonMode.PRIMARY} onClick={() => setView(View.TAGS)}/>
      </div>
        {view === View.DAY? <DayView client={client} initialDate={new Date()} />: <></>}
        {view === View.TAGS? <TagsView />: <></>}
      <Button 
        text="Log out"
        onClick={() => onLogout()}
      />
    </div>
}