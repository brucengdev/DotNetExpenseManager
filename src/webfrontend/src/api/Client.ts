import { Expense } from "./Expense"

export interface IClient {
    IsLoggedIn: () => Promise<boolean>
    Login: (username: string, pass: string) => Promise<boolean>
    GetExpensesByDate: (date: Date) => Promise<Expense[]>
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

    async GetExpensesByDate(date: Date): Promise<Expense[]> {
        return []
    }
}