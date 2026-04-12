
interface CheckBoxProps {
    label: string,
    checked: boolean,
    onChange?: (checked: boolean) => void,
    dataTestId?: string
    disabled?: boolean
    className?: string
}

export function CheckBox(props: CheckBoxProps) {
    const { label, checked, onChange, disabled, dataTestId, className } = props
    return <label className={`mr-4 ${className}`}>
        <input 
            className="mr-1"
            data-testId={dataTestId}
            type="checkbox" 
            checked={checked} 
            disabled={disabled}
            onClick={_ => {
                if(onChange) {
                    onChange(!checked)
                }
            }}
        />
        {label}
    </label>
}