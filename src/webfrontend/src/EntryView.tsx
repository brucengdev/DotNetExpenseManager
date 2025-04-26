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
    return <div data-testid="entry">
        <div className="col entryLabel" data-testid="title">{title}</div>
        <div className="col categoryLabel" data-testid="category">{categoryName}</div>
        <div className="col entryValue" data-testid="value">{value}</div>
        {onDelete? <button data-testid="deleteBtn" onClick={() => setShowConfirmDeletion(true)}>X</button>: <></>}
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