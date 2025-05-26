import { ChangeEventHandler } from "react"

interface TextBoxProps {
    name: string
    value: string
    onChange?: ChangeEventHandler<HTMLInputElement>
    className?: string
    label: string
    inputClassName?: string
    autoComplete?: string
    type?: string
    placeholder?: string
}

export function TextBox(props: TextBoxProps) {
    const { name, value, onChange, 
        className, label, inputClassName,
        autoComplete, type, placeholder } = props
    return <div className={className || ""}>
                <label htmlFor={name} className="block text-sm/6 font-semibold text-gray-900">{label}</label>
                <div className="mt-2.5">
                <input type={type || "text"} name={name} 
                    id={name} autoComplete={autoComplete} 
                    value={value}
                    onChange={onChange}
                    className={"block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 " +
                        "outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 " +
                        (inputClassName || "")
                    }
                    placeholder={placeholder}
                    />
                </div>
            </div>
}