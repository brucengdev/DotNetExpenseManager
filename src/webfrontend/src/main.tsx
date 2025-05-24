import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Client } from './api/Client.ts'
import { Storage } from './storage/Storage.ts'

const client = new Client()
const storage = new Storage()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App client={client} storage={storage} />
  </StrictMode>,
)
