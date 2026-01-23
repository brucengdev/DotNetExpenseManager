import { Button } from "./controls/Button";
import { TextBox } from "./controls/TextBox";

export function AddTagForm() {
    return <div data-testid="add-tag-form">
        <TextBox label="Tag name" name="edit-tag-name" value="" />
        <Button text="Save" onClick={() => {}} />
    </div>;
}