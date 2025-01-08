interface ConfirmDeleteViewProps {
    onYes?: () => void
    onNo?: () => void
}

export function ConfirmDeleteView({onYes, onNo}: ConfirmDeleteViewProps) {
    return <div data-testid="confirmDeleteView">
        <h2>Confirm to delete?</h2>
        <button onClick={() => {if(onYes) {onYes()}}} >Yes</button>
        <button onClick={() => {if(onNo) {onNo()}}} >No</button>
    </div>
}