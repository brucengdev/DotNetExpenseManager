import { useState } from "react"
import "./EntryView.css"
import { ConfirmDeleteView } from "./ConfirmDeleteView"

export interface EntryProps {
    title: string
    value: number,
    onDelete?: () => void
}

export const EntryView = ({title, value, onDelete}: EntryProps) => {
    const [showConfirmDeletion, setShowConfirmDeletion] = useState(false)
    return <div data-testid="entry">
        <div className="col entryLabel" data-testid="title">{title}</div>
        <div className="col" data-testid="value">{value}</div>
        {onDelete? <button onClick={() => setShowConfirmDeletion(true)}>X</button>: <></>}
        {showConfirmDeletion?
         <ConfirmDeleteView 
            onYes={() => {if(onDelete) { onDelete()}} }
         />
         : <></> }
    </div>
}