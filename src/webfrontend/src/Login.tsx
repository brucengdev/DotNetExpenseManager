import { useState } from "react"
import './Login.css'

export function Login() {
    const [username, setUsername] = useState("")
    const [usernameWarn, setUsernameWarn] = useState(false)
    const [password, setPassword] = useState("")
    const [passwordWarn, setPasswordWarn] = useState(false)
    return <>
      <h1>Login</h1>
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
        setUsernameWarn(username == "")
        setPasswordWarn(password == "")
      }
    }>Login</button>
    </>
}