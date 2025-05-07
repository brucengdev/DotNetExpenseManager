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

    return <form data-testid="login-view" className="container">
        <div className="mb-3">
            <label className="form-label">
                Username
                <input type="text" 
                    className={(usernameWarn? "border-danger": "") + " form-control"} 
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    ></input>
            </label>
        </div>
        <div className="mb-3">
            <label className="form-label">
                Password
                <input type="password" 
                    className={(passwordWarn? "border-danger": "") + " form-control"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    ></input>
            </label>
      </div>
      <button 
        className="btn btn-primary"
        onClick={(e) => {
            e.preventDefault()
            const valid = validateForm()
            if(valid) {
                login(client, storage, username, password, onLogin)
            }
            setUsernameWarn(username == "")
            setPasswordWarn(password == "")
        }
        }>Login</button>
    </form>
}

const login = async (client: IClient, storage: IStorage, username: string, password:string, onLogin: () => void) => {
    const success = await client.Login(username, password)
    if(success) {
        storage.Set(STORED_TOKEN, client.Token())
        onLogin()
    }
}