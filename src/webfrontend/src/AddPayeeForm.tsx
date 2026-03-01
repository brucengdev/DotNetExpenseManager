import { useState } from "react";
import { Button, ButtonMode } from "./controls/Button";
import { TextBox } from "./controls/TextBox";

interface AddPayeeFormProps {
    onSave?: (payeeName: string) => void
    onCancel?: () => void
}

export function AddPayeeForm(props: AddPayeeFormProps) {
    const [payeeName, setPayeeName] = useState("")
    const { onSave, onCancel } = props
    return <div data-testid="add-payee-form">
        <TextBox label="Payee name" name="edit-payee-name" value={payeeName} onChange={(e) => setPayeeName(e.target.value)} />
        <Button text="Save" className="mt-2" onClick={() => {
            if(onSave) { onSave(payeeName) }
        }} />
        <Button text="Cancel" mode={ButtonMode.SECONDARY} className="mt-2" onClick={() => {
            if(onCancel) { onCancel() }
        }} />
    </div>;
}