
export interface IClient {
    IsLoggedIn: () => Promise<boolean>
}

export class Client implements IClient {
    async IsLoggedIn() {
        return false
    }
}