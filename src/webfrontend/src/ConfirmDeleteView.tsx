interface ConfirmDeleteViewProps {
    onYes?: () => void
    onNo?: () => void
}

export function ConfirmDeleteView({onYes, onNo}: ConfirmDeleteViewProps) {
    return <div data-testid="confirmDeleteView" className="row">
        <h2 className="row">Confirm to delete?</h2>
        <div className="row">
            <button 
                className="btn btn-danger col-1"
                onClick={() => {if(onYes) {onYes()}}} >Yes</button>
            <button 
                className="btn btn-primary col-1"
                onClick={() => {if(onNo) {onNo()}}} >No</button>
        </div>
    </div>
}