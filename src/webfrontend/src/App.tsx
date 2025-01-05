import { useState } from 'react'
import { IClient } from './api/Client'
import { Login } from './Login'
import { MainView } from './MainView'
import { IStorage, STORED_TOKEN } from './storage/Storage'

export interface AppProps {
  client: IClient,
  storage: IStorage
}

function App({client, storage}: AppProps) {
  const [loggedIn, setLoggedIn] = useState(false)
  const storedToken = storage.Get(STORED_TOKEN)
  if(storedToken) {
    client.LoginByToken(storedToken)
    .then(result => {
      if(result != loggedIn) {
        setLoggedIn(result)
      }
    })
  }
  client.IsLoggedIn()
  .then(result => {
    if(result != loggedIn) {
      setLoggedIn(result)
    }
})
  return (
    <>
      {loggedIn? <MainView client={client} />: <Login client={client} storage={storage} onLogin={() => { 
          setLoggedIn(true)
        } 
      } 
      />}
    </>
  )
}

export default App
