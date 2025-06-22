import { useState } from 'react'
import { IClient } from './api/Client'
import { Login } from './Login'
import { MainView } from './MainView'
import { IStorage, STORED_TOKEN } from './storage/Storage'
import "./globals.css"

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
    <div className="xl:px-100 md:px-30 lg:px-60 pt-5">
      {loggedIn
      ? <MainView client={client} onLogout={() => { 
        storage.Clear(STORED_TOKEN)
        client.Logout()
        setLoggedIn(false) 
      }} />
      : <Login client={client} storage={storage} onLogin={() => { 
          setLoggedIn(true)
        } 
      }
      />}
    </div>
  )
}

export default App
