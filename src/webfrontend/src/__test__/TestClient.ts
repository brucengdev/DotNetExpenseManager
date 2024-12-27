import { IClient } from "../api/Client";

export const TEST_USER_NAME = "valid_user"
export const TEST_PASSWORD = "correct_pass"

export class TestClient implements IClient {
    private _loggedIn = false;
    async IsLoggedIn() {
        return this._loggedIn
    }
    async Login(username: string, pass: string) {
        this._loggedIn = username === TEST_USER_NAME && pass === TEST_PASSWORD;
        return this.IsLoggedIn();
    }
}