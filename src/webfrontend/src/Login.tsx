export function Login() {
    return <>
      <h1>Login</h1>
      <label>
        Username
        <input type="text" className="mandatory" />
      </label>
      <label>
        Password
        <input type="password" />
      </label>
      <button>Login</button>
    </>
}