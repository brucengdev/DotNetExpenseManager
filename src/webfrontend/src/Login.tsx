import { useState } from "react"

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
            ></input>
      </label>
      <button onClick={() => {
        if(username == "") { setUsernameWarn(true) }
        if(password == "") { setPasswordWarn(true) }
      }
    }>Login</button>
    </>
}