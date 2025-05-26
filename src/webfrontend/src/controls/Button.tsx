import { MouseEventHandler } from "react"

interface ButtonProps {
    text: string
    onClick?: MouseEventHandler<HTMLButtonElement>
    className?: string
    mode?: ButtonMode
}

export enum ButtonMode {
    SECONDARY,
    PRIMARY
}

export function Button({text, mode, onClick, className}: ButtonProps) {
    let classes = "block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold " +
                    "shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 " +
                    ` focus-visible:outline-indigo-600 ${className} `
    switch(mode) {
        case ButtonMode.SECONDARY: 
            classes += " bg-gray-300 hover:bg-gray-200 text-black"
            break;
        case ButtonMode.PRIMARY:
        default:
            classes += " bg-indigo-600 hover:bg-indigo-500 text-white"
    }
    return <button type="submit" 
                onClick={onClick}
                className={classes}>
                    {text}
                </button>
}
