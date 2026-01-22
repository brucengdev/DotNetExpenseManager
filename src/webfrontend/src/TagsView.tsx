import { IClient } from "./api/Client"
import { Button } from "./controls/Button"
import { TagItemView } from "./TagItemView"

export interface TagsViewProps {
    client: IClient
}

export const TagsView = (_: TagsViewProps) => {
    return <div data-testid="tags-view" className="mb-5">
        <TagItemView />
        <TagItemView />
        <Button text="+" />
    </div>
}