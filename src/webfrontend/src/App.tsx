import { useState } from 'react'
import { IClient } from './api/Client'
import { Login } from './Login'
import { MainView } from './Expenses'

export interface AppProps {
  client: IClient
}

function App({client}: AppProps) {
  const [loggedIn, setLoggedIn] = useState(false)
  client.IsLoggedIn()
  .then(loggedIn => setLoggedIn(loggedIn))
  return (
    <>
      {loggedIn? <MainView />: <Login client={client} onLogin={() => {} } />}
    </>
  )
}

export default App
