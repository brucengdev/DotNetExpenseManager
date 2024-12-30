
export interface IClient {
    IsLoggedIn: () => Promise<boolean>
    Login: (username: string, pass: string) => Promise<boolean>
}

export class Client implements IClient {
    Login = () => new Promise<boolean>((resolve: any) => resolve(true))
    async IsLoggedIn() {
        return false
    }
}