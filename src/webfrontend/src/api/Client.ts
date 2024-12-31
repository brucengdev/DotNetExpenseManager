
export interface IClient {
    IsLoggedIn: () => Promise<boolean>
    Login: (username: string, pass: string) => Promise<boolean>
}

const devUrl = "https://localhost:7146"
const url = import.meta.env.VITE_API_SERVER || devUrl

export class Client implements IClient {
    private loggedIn: boolean = false
    public async Login(username: string, password: string): Promise<boolean> {
        const result = await fetch(`${url}/Account/Login?${new URLSearchParams({
            username,
            password
        }).toString()}`, {
            method: "POST"
        })
        this.loggedIn = result.ok
        return this.loggedIn
    }
    async IsLoggedIn() {
        return this.loggedIn
    }
}