import { Entry } from "./Entry"

export interface IClient {
    Token: () => string | undefined
    IsLoggedIn: () => Promise<boolean>
    Login: (username: string, pass: string) => Promise<boolean>
    LoginByToken: (token:string) => Promise<boolean>
    Logout: () => void
    GetEntriesByDate: (date: Date) => Promise<Entry[]>
    AddEntry: (entry: Entry) => Promise<boolean>
}

const devUrl = "https://localhost:7146"
let url = import.meta.env.VITE_API_SERVER || devUrl

//means the frontend is in same host as backend
if(url === '/') { url = '' }

export class Client implements IClient {
    private token: string = ""
    public Token() { return this.token }
    public async Login(username: string, password: string): Promise<boolean> {
        const result = await fetch(`${url}/Account/Login?${new URLSearchParams({
            username,
            password
        }).toString()}`, {
            method: "POST"
        })
        if(result.ok) {
            this.token = await result.text()
        } else {
            this.token = ""
        }
        return this.token !== ""
    }

    async IsLoggedIn() {
        return await this.IsTokenValid(this.token)
    }

    Logout() {
        this.token = ""
    }

    private async IsTokenValid(token: string) {
        const result = await fetch(`${url}/Account/IsLoggedIn?${new URLSearchParams({
            token
        }).toString()}`)
        return result.ok
    }

    async LoginByToken(token: string) {
        const succeeded = await this.IsTokenValid(token)
        this.token = token
        return succeeded
    }

    async GetEntriesByDate(_: Date): Promise<Entry[]> {
        return []
    }
    async AddEntry(entry: Entry): Promise<boolean> {
        const result = await fetch(`${url}/Entries/AddEntry?${new URLSearchParams({
            accessToken: this.token
        }).toString()}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entry)
        })  
        if(result.ok) {
            this.token = await result.text()
        } else {
            this.token = ""
        }
        return this.token !== ""
    }
}