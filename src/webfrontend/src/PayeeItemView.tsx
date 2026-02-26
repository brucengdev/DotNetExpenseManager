interface PayeeItemViewProps {
    payee: string
}

export const PayeeItemView = ({payee}: PayeeItemViewProps) => {
    return <div data-testid="payee">
        <div data-testid="payee-name">{payee}</div>
    </div>
}