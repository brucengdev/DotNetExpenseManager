import { MouseEventHandler } from "react"

interface ButtonProps {
    text: string
    onClick: MouseEventHandler<HTMLButtonElement>
    extraClasses?: string
}

export function Button({text, onClick, extraClasses}: ButtonProps) {
    return <button type="submit" 
                onClick={onClick}
                className={"block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold " +
                    "text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 " +
                    " focus-visible:outline-indigo-600"
                    + (extraClasses || "")}>
                    {text}
                </button>
}
