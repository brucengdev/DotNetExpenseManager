import { IClient } from "../api/Client";

export class TestClient implements IClient {
    async IsLoggedIn() {
        return this.LoggedIn
    }
    public LoggedIn: boolean = false

    async Login(username: string, pass: string) {
        return true
    }
}