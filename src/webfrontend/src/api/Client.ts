import { Entry } from "./Entry"

export interface IClient {
    IsLoggedIn: () => Promise<boolean>
    Login: (username: string, pass: string) => Promise<boolean>
    GetEntriesByDate: (date: Date) => Promise<Entry[]>
    AddEntry: (entry: Entry) => Promise<boolean>
}

const devUrl = "https://localhost:7146"
let url = import.meta.env.VITE_API_SERVER || devUrl

//means the frontend is in same host as backend
if(url === '/') { url = '' }

export class Client implements IClient {
    private token: string = ""
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
        const result = await fetch(`${url}/Account/IsLoggedIn?${new URLSearchParams({
            token: this.token
        }).toString()}`)
        return result.ok
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