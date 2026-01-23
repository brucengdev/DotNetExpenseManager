import { Button } from "./controls/Button";
import { TextBox } from "./controls/TextBox";

interface AddTagFormProps {
    onSave?: () => void
}

export function AddTagForm(props: AddTagFormProps) {
    const { onSave } = props
    return <div data-testid="add-tag-form">
        <TextBox label="Tag name" name="edit-tag-name" value="" />
        <Button text="Save" onClick={() => {
            if(onSave) { onSave() }
        }} />
    </div>;
}