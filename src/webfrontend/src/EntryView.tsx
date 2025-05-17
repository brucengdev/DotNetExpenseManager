import { useState } from "react"
import "./EntryView.css"
import { ConfirmDeleteView } from "./ConfirmDeleteView"

export interface EntryProps {
    title: string
    value: number,
    categoryName: string,
    onDelete?: () => void
}

export const EntryView = ({title, value, categoryName, onDelete}: EntryProps) => {
    const [showConfirmDeletion, setShowConfirmDeletion] = useState(false)
    return <div data-testid="entry" className="row">
        <div className="col-5 entryLabel" data-testid="title">{title}</div>
        <div className="col-3 categoryLabel" data-testid="category">{categoryName}</div>
        <div className="col-3 entryValue" data-testid="value">{value}</div>
        <div className="col-1">
            {onDelete
                ? <button
                    className="btn btn-danger"
                    data-testid="deleteBtn" onClick={() => setShowConfirmDeletion(true)}>X</button>
                : <></>}
        </div>
        {showConfirmDeletion?
         <ConfirmDeleteView 
            onYes={() => {
                if(onDelete) { 
                    onDelete()
                }
                setShowConfirmDeletion(false)
            } }
            onNo={() => setShowConfirmDeletion(false)}
         />
         : <></> }
    </div>
}