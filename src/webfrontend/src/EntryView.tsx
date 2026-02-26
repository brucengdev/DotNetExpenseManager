import { useState } from "react"
import { ConfirmDeleteView } from "./ConfirmDeleteView"
import { Button, ButtonMode } from "./controls/Button"

export interface EntryProps {
    title: string
    value: number,
    categoryName: string,
    onDelete?: () => void,
    tags?: string,
}

export const EntryView = (props: EntryProps) => {
    const {title, value, categoryName, tags, onDelete} = props
    const [showConfirmDeletion, setShowConfirmDeletion] = useState(false)
    return <div data-testid="entry" className="grid grid-cols-5 mb-1">
        <div data-testid="title">{title}</div>
        <div data-testid="category">{categoryName}</div>
        <div data-testid="value">{value}</div>
        <div data-testid="tags">{tags ?? ""}</div>
        <div className="place-items-end">
            {onDelete
                ? <Button
                    mode={ButtonMode.DANGER}
                    dataTestId="deleteBtn"
                    onClick={() => setShowConfirmDeletion(true)} text="X" />
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