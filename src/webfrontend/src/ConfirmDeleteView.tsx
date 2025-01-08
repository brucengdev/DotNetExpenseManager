interface ConfirmDeleteViewProps {
    onYes?: () => void
}

export function ConfirmDeleteView({onYes}: ConfirmDeleteViewProps) {
    return <div data-testid="confirmDeleteView">
        <h2>Confirm to delete?</h2>
        <button onClick={() => {if(onYes) {onYes()}}} >Yes</button>
        <button>No</button>
    </div>
}