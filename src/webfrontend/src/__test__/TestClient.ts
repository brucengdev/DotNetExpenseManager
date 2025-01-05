import { IClient } from "../api/Client";
import { Entry } from "../api/Entry";
import { sameDate } from "../utils";

export const TEST_USER_NAME = "valid_user"
export const TEST_PASSWORD = "correct_pass"
export const TEST_TOKEN = "correcttoken"

export class TestClient implements IClient {
    private _loggedIn = false
    private _token: string | undefined = undefined
    public Token() { return this._token }
    public Entries: Entry[] = []
    async IsLoggedIn() {
        return this._loggedIn
    }
    async Login(username: string, pass: string) {
        this._loggedIn = username === TEST_USER_NAME && pass === TEST_PASSWORD;
        if(this._loggedIn) {
            this._token = TEST_TOKEN
        }
        return this.IsLoggedIn();
    }

    async LoginByToken(token: string) {
        this._loggedIn = token === TEST_TOKEN
        if(this._loggedIn) {
            this._token = token
        }
        return this._loggedIn
    }

    async GetEntriesByDate(date: Date): Promise<Entry[]> {
        return this.Entries
            .filter(entry => sameDate(entry.date, date))
    }

    async AddEntry(entry: Entry): Promise<boolean> {
        this.Entries.push(entry)
        return true
    }
}