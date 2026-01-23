import { useState } from "react"
import { IClient } from "./api/Client"
import { Button } from "./controls/Button"
import { TagItemView } from "./TagItemView"
import { Tag } from "./models/Tag"
import { AddTagForm } from "./AddTagForm"

export interface TagsViewProps {
    client: IClient
}

export const TagsView = (props: TagsViewProps) => {
    const { client } = props
    const [tags, setTags] = useState<Tag[] | undefined>(undefined)
    if(tags === undefined) {
        client.GetTags()
        .then(retrievedTags => setTags(retrievedTags))
    }

    return <div data-testid="tags-view" className="mb-5">
        {
            (tags ?? []).map(tag => {
                return <TagItemView key={tag.id} tag={tag} />
            })
        }
        <Button text="+" />
        <AddTagForm />
    </div>
}