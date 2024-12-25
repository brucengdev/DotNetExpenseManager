import { IClient } from "../api/Client";

export class TestClient implements IClient {
    async IsLoggedIn() {
        return false
    }
    async Login(username: string, pass: string) {
        return false
    }
}