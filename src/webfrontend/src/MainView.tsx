import { IClient } from "./api/Client"
import { Button, ButtonMode } from "./controls/Button"
import { DayView } from "./DayView"
import { TagsView } from "./TagsView"

export interface MainViewProps {
  client: IClient
  onLogout: () => void
}

export function MainView({client, onLogout} : MainViewProps) {
    return <div data-testid="main-view" className="row-auto">
      <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold text-gray-900">Expenses</h2>
      </div>
      <div className="mb-5">
        <Button text="Day" mode={ButtonMode.PRIMARY}/>
        <Button text="Tags" mode={ButtonMode.PRIMARY}/>
      </div>
        <DayView client={client} initialDate={new Date()} />
        <TagsView />
      <Button 
        text="Log out"
        onClick={() => onLogout()}
      />
    </div>
}