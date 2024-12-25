
export interface IClient {
    IsLoggedIn: () => Promise<boolean>
    Login: () => Promise<boolean>
}

export class Client implements IClient {
    Login = () => new Promise<boolean>((resolve: any) => resolve(true))
    async IsLoggedIn() {
        return false
    }
}