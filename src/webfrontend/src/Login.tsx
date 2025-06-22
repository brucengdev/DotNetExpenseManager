import { useState } from "react"
import { IClient } from "./api/Client"
import { IStorage, STORED_TOKEN } from "./storage/Storage"
import { Button } from "./controls/Button"
import { TextBox } from "./controls/TextBox"

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

    return <div className="isolate bg-white">
        <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">Login to expenses</h2>
        </div>
        <form data-testid="login-view" action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <TextBox
                className="sm:col-span-2"
                name="username"
                label="Username"
                value={username}
                autoComplete="username"
                onChange={e => setUsername(e.target.value)}
                inputClassName={usernameWarn?"border-red-600":""}
             />
             <TextBox
                className="sm:col-span-2"
                name="password"
                label="Password"
                type="password"
                value={password}
                autoComplete="password"
                onChange={e => setPassword(e.target.value)}
                inputClassName={passwordWarn?"border-red-600":""}
             />
            </div>
            <div className="mt-10">
                <Button
                    text="Login"
                    className="w-full"
                    onClick={(e) => {
                                e.preventDefault()
                                const valid = validateForm()
                                if(valid) {
                                    login(client, storage, username, password, onLogin)
                                }
                                setUsernameWarn(username == "")
                                setPasswordWarn(password == "")
                            }}
                />
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