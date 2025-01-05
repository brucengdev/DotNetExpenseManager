import { IClient } from "../api/Client";
import { Entry } from "../api/Entry";
import { sameDate } from "../utils";

export const TEST_USER_NAME = "valid_user"
export const TEST_PASSWORD = "correct_pass"
export const TEST_TOKEN = "correcttoken"

export class TestClient implements IClient {
    private _loggedIn = false;
    public Entries: Entry[] = []
    async IsLoggedIn() {
        return this._loggedIn
    }
    async Login(username: string, pass: string) {
        this._loggedIn = username === TEST_USER_NAME && pass === TEST_PASSWORD;
        return this.IsLoggedIn();
    }

    async LoginByToken(token: string) {
        this._loggedIn = token === TEST_TOKEN
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