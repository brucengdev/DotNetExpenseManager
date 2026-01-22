import { Button } from "./controls/Button"
import { TagItemView } from "./TagItemView"

export interface TagsViewProps {
}

export const TagsView = (_: TagsViewProps) => {
    return <div data-testid="tags-view" className="mb-5">
        <TagItemView />
        <TagItemView />
        <Button text="+" />
    </div>
}