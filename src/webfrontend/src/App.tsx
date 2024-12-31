import { useState } from 'react'
import { IClient } from './api/Client'
import { Login } from './Login'
import { MainView } from './MainView'

export interface AppProps {
  client: IClient
}

function App({client}: AppProps) {
  const [loggedIn, setLoggedIn] = useState(false)
  client.IsLoggedIn()
  .then(result => {
    if(result != loggedIn) {
      setLoggedIn(result)
    }
})
  return (
    <>
      {loggedIn? <MainView />: <Login client={client} onLogin={() => { 
          setLoggedIn(true)
        } 
      } 
      />}
    </>
  )
}

export default App
