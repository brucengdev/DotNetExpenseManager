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

    return <div data-testid="login-view">
      <label>
        Username
        <input type="text" 
            className={usernameWarn? "mandatory": ""} 
            value={username}
            onChange={e => setUsername(e.target.value)}
            ></input>
      </label>
      <label>
        Password
        <input type="password" 
            className={passwordWarn? "mandatory": ""}
            value={password}
            onChange={e => setPassword(e.target.value)}
            ></input>
      </label>
      <button onClick={() => {
        const valid = validateForm()
        if(valid) {
            login(client, storage, username, password, onLogin)
        }
        setUsernameWarn(username == "")
        setPasswordWarn(password == "")
      }
    }>Login</button>
    </div>
}

const login = async (client: IClient, storage: IStorage, username: string, password:string, onLogin: () => void) => {
    const success = await client.Login(username, password)
    if(success) {
        storage.Set(STORED_TOKEN, client.Token())
        onLogin()
    }
}