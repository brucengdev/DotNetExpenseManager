import { useState } from "react"
import { IClient } from "./api/Client"
import { Payee } from "./models/Payee"
import { PayeeItemView } from "./PayeeItemView"
import { Button } from "./controls/Button"
import { AddPayeeForm } from "./AddPayeeForm"

export interface PayeesViewProps {
    client: IClient
}

export const PayeesView = (props: PayeesViewProps) => {
    const { client } = props
    const [payees, setPayees] = useState<Payee[] | undefined>(undefined)
    const [showsAddPayeeForm, setShowsAddPayeeForm] = useState(false)
    if(payees === undefined) {
        client.GetPayees()
        .then(retrievedPayees => setPayees(retrievedPayees))
    }

    return <div data-testid="payees-view" className="mb-5">
        {
            (payees ?? []).map(payee => {
                return <PayeeItemView key={payee.id} payee={payee.name} />
            })
        }

    {showsAddPayeeForm
                ? <AddPayeeForm 
                    onSave={(payeeName) => {
                        client.AddPayee(payeeName)
                        .then(() => setPayees(undefined))
                        .then(() => setShowsAddPayeeForm(false))
                    }}
                    onCancel={() => setShowsAddPayeeForm(false)}
                />
                : <Button text="+" onClick={() => setShowsAddPayeeForm(true)}/>}
    </div>
}