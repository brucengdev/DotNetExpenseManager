import { useState } from "react"

export function Login() {
    const [usernameWarn, setUsernameWarn] = useState(false)
    return <>
      <h1>Login</h1>
      <label>
        Username
        <input type="text" className={usernameWarn? "mandatory": ""}></input>
      </label>
      <label>
        Password
        <input type="password"></input>
      </label>
      <button onClick={() => setUsernameWarn(true)}>Login</button>
    </>
}