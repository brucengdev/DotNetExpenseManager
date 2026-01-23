import { useState } from "react";
import { Button } from "./controls/Button";
import { TextBox } from "./controls/TextBox";

interface AddTagFormProps {
    onSave?: (tagName: string) => void
}

export function AddTagForm(props: AddTagFormProps) {
    const [tagName, setTagName] = useState("")
    const { onSave } = props
    return <div data-testid="add-tag-form">
        <TextBox label="Tag name" name="edit-tag-name" value={tagName} onChange={(e) => setTagName(e.target.value)} />
        <Button text="Save" onClick={() => {
            if(onSave) { onSave(tagName) }
        }} />
    </div>;
}