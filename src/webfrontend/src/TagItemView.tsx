import { Tag } from "./models/Tag"

interface TagItemViewProps {
    tag: Tag
}

export const TagItemView = ({tag}: TagItemViewProps) => {
    return <div data-testid="tag">
        <div data-testid="tag-name">{tag.name}</div>
    </div>
}