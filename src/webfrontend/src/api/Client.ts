import { Category } from "../models/Category"
import { Entry } from "../models/Entry"
import { Payee } from "../models/Payee"
import { Tag } from "../models/Tag"

export interface IClient {
    Token: () => string | undefined
    IsLoggedIn: () => Promise<boolean>
    Login: (username: string, pass: string) => Promise<boolean>
    LoginByToken: (token:string) => Promise<boolean>
    Logout: () => void
    GetEntriesByDate: (date: Date) => Promise<Entry[]>
    AddEntry: (entry: Entry) => Promise<boolean>
    DeleteEntry(id: number): Promise<boolean>
    GetCategories: () => Promise<Category[]>
    AddCategory: (name: string) => Promise<boolean>

    AddTag: (name: string) => Promise<boolean>
    GetTags: () => Promise<Tag[]>

    AddPayee: (name: string) => Promise<boolean>
    GetPayees: () => Promise<Payee[]>
}

const devUrl = "https://localhost:7146"
let url = import.meta.env.VITE_API_SERVER || devUrl

//means the frontend is in same host as backend
if(url === '/') { url = '' }

export class Client implements IClient {
    private token: string = ""
    public Token() { return this.token }
    public async Login(username: string, password: string): Promise<boolean> {
        const formData = new FormData()
        formData.append("username", username)
        formData.append("password", password)
        const result = await fetch(`${url}/Account/Login`, {
            method: "POST",
            body: formData
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

    private async IsTokenValid(accessToken: string) {
        const result = await fetch(`${url}/Account/IsLoggedIn?${new URLSearchParams({
            accessToken
        }).toString()}`)
        return result.ok
    }

    async LoginByToken(token: string) {
        const succeeded = await this.IsTokenValid(token)
        this.token = token
        return succeeded
    }

    async GetEntriesByDate(date: Date): Promise<Entry[]> {
        const result = await fetch(`${url}/Entries/GetByDate?${new URLSearchParams({
            accessToken: this.token,
            date: date.toISOString()
        }).toString()}`, {
            method: "GET"
        })
        if(result.ok) {
            return ((await result.json()) as Entry[])
                    .map(e => Entry.FromOther(e))
        }
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
        return result.ok
    }
    
    async DeleteEntry(id: number): Promise<boolean> {
        const result = await fetch(`${url}/Entries/Delete?${new URLSearchParams({
            accessToken: this.token,
            id: id.toString()
        }).toString()}`, {
            method: "DELETE",
        })  
        return result.ok
    }

    async GetCategories(): Promise<Category[]> {
        const result = await fetch(`${url}/Category/GetCategories?${new URLSearchParams({
            accessToken: this.token,
        }).toString()}`, {
            method: "GET"
        })
        if(result.ok) {
            return ((await result.json()) as Category[])
                .map(c => new Category(c.id, c.name))
        }
        return []
    }

    async AddCategory(name: string): Promise<boolean> {
        const result = await fetch(`${url}/Category/AddCategory?${new URLSearchParams({
            accessToken: this.token
        }).toString()}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(new Category(0, name))
        })  
        return result.ok
    }

    async AddTag(name: string): Promise<boolean> {
        const result = await fetch(`${url}/tags?${new URLSearchParams({
            accessToken: this.token
        }).toString()}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(new Tag(0, name))
        })  
        return result.ok
    }

    async GetTags(): Promise<Tag[]> {
        const result = await fetch(`${url}/tags?${new URLSearchParams({
            accessToken: this.token,
        }).toString()}`, {
            method: "GET"
        })
        if(result.ok) {
            return ((await result.json()) as Tag[])
                .map(t => new Tag(t.id, t.name))
        }
        return []
    }

    async AddPayee(name: string): Promise<boolean> {
        const result = await fetch(`${url}/payees?${new URLSearchParams({
            accessToken: this.token
        }).toString()}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(new Payee(0, name))
        })  
        return result.ok
    }

    async GetPayees(): Promise<Payee[]> {
        const result = await fetch(`${url}/payees?${new URLSearchParams({
            accessToken: this.token,
        }).toString()}`, {
            method: "GET"
        })
        if(result.ok) {
            return ((await result.json()) as Payee[])
                .map(p => new Payee(p.id, p.name))
        }
        return []
    }
}