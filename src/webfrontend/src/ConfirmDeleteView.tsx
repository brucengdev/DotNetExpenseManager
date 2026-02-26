import { Button, ButtonMode } from "./controls/Button"

interface ConfirmDeleteViewProps {
    onYes?: () => void
    onNo?: () => void
}

export function ConfirmDeleteView({onYes, onNo}: ConfirmDeleteViewProps) {
    return <div data-testid="confirmDeleteView">
        <h2>Confirm to delete?</h2>
        <div>
            <Button text="Yes" mode={ButtonMode.DANGER} 
                onClick={() => {if(onYes) {onYes()}}} />
            <Button text="No" mode={ButtonMode.PRIMARY}
                onClick={() => {if(onNo) {onNo()}}} />
        </div>
    </div>
}