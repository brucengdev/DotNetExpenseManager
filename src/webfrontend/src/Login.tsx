import { useState } from "react"
import './Login.css'
import { IClient } from "./api/Client"

interface LoginProps {
    client: IClient
    onLogin: () => void
}

export function Login({client, onLogin}: LoginProps) {
    const [username, setUsername] = useState("")
    const [usernameWarn, setUsernameWarn] = useState(false)
    const [password, setPassword] = useState("")
    const [passwordWarn, setPasswordWarn] = useState(false)

    const validateForm = () => {
        const valid = username != "" && password != ""
        return valid
    }

    return <div data-testid="login-view">
      {/* <h1>Login</h1> */}
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
            login(client, username, password, onLogin)
        }
        setUsernameWarn(username == "")
        setPasswordWarn(password == "")
      }
    }>Login</button>
    </div>
}

const login = async (client: IClient, username: string, password:string, onLogin: () => void) => {
    const success = await client.Login(username, password)
    if(success) {
        onLogin()
    }
}