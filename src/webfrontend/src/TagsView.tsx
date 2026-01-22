import { Button } from "./controls/Button"

export interface TagsViewProps {
}

export const TagsView = (_: TagsViewProps) => {
    return <div data-testid="tags-view" className="mb-5">
        <div data-testid="tag">Sample tag</div>
        <Button text="+" />
    </div>
}