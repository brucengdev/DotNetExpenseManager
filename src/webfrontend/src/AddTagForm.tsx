import { useState } from "react";
import { Button, ButtonMode } from "./controls/Button";
import { TextBox } from "./controls/TextBox";

interface AddTagFormProps {
    onSave?: (tagName: string) => void
    onCancel?: () => void
}

export function AddTagForm(props: AddTagFormProps) {
    const [tagName, setTagName] = useState("")
    const { onSave, onCancel } = props
    return <div data-testid="add-tag-form">
        <TextBox label="Tag name" name="edit-tag-name" value={tagName} onChange={(e) => setTagName(e.target.value)} />
        <Button text="Save" className="mt-2" onClick={() => {
            if(onSave) { onSave(tagName) }
        }} />
        <Button text="Cancel" mode={ButtonMode.SECONDARY} className="mt-2" onClick={() => {
            if(onCancel) { onCancel() }
        }} />
    </div>;
}