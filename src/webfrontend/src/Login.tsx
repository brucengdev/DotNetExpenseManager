import { useState } from "react"
import './Login.css'
import { IClient } from "./api/Client"
import { IStorage, STORED_TOKEN } from "./storage/Storage"

interface LoginProps {
    client: IClient
    storage: IStorage
    onLogin: () => void
}

export function Login({client, storage, onLogin}: LoginProps) {
    const [username, setUsername] = useState("")
    const [usernameWarn, setUsernameWarn] = useState(false)
    const [password, setPassword] = useState("")
    const [passwordWarn, setPasswordWarn] = useState(false)

    const validateForm = () => {
        const valid = username != "" && password != ""
        return valid
    }

    return <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">Login to expenses</h2>
        </div>
        <form data-testid="login-view" action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
                <label htmlFor="username" className="block text-sm/6 font-semibold text-gray-900">Username</label>
                <div className="mt-2.5">
                <input type="text" name="username" 
                    id="username" autoComplete="username" 
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className={"block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 " +
                        "outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" +
                        (usernameWarn?"border-red-600":"")
                    }
                    />
                </div>
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="password" className="block text-sm/6 font-semibold text-gray-900">Password</label>
                <div className="mt-2.5">
                <input type="password" name="password" 
                    id="password" autoComplete="password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className={"block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 " +
                        "-outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 " +
                        "focus:-outline-offset-2 focus:outline-indigo-600"
                        + (passwordWarn? "border-red-600": "")
                    }
                    />
                </div>
            </div>
            </div>
            <div className="mt-10">
            <button type="submit" 
                onClick={(e) => {
                                e.preventDefault()
                                const valid = validateForm()
                                if(valid) {
                                    login(client, storage, username, password, onLogin)
                                }
                                setUsernameWarn(username == "")
                                setPasswordWarn(password == "")
                            }}
                className={"block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold " +
                    "text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 " +
                    " focus-visible:outline-indigo-600"}>
                    Login
                </button>
            </div>
        </form>
    </div>
}

const login = async (client: IClient, storage: IStorage, username: string, password:string, onLogin: () => void) => {
    const success = await client.Login(username, password)
    if(success) {
        storage.Set(STORED_TOKEN, client.Token())
        onLogin()
    }
}