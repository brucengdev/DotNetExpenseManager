import { useState } from "react"
import { ConfirmDeleteView } from "./ConfirmDeleteView"
import { Button, ButtonMode } from "./controls/Button"
import { formatDateToDay, formatMoney } from "./utils"

export interface EntryProps {
    title: string
    value: number
    categoryName: string
    onDelete?: () => void
    tags?: string
    payee?: string
    notes?: string
    date?: Date
}

export const EntryView = (props: EntryProps) => {
    const {title, value, categoryName, date,
        tags, payee, notes, onDelete} = props
    const [showConfirmDeletion, setShowConfirmDeletion] = useState(false)
    let gridColsClass = "grid-cols-7"
    if(date !== undefined) {
        gridColsClass = "grid-cols-8"
    }
    return <div data-testid="entry" className={`grid ${gridColsClass} mb-1`}>
        {
            date?<div data-testid="date">{formatDateToDay(date)}</div>
            :<></>
        }
        <div data-testid="title">{title}</div>
        <div data-testid="category">{categoryName}</div>
        <div data-testid="value">{formatMoney(value)}</div>
        <div data-testid="tags">{tags ?? ""}</div>
        <div data-testid="payee">{payee ?? ""}</div>
        <div data-testid="notes">{notes ?? ""}</div>
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