import { Category } from "../models/Category";
import { IClient } from "../api/Client";
import { Entry } from "../models/Entry";
import { sameDate } from "../utils";

export const TEST_USER_NAME = "valid_user"
export const TEST_PASSWORD = "correct_pass"
export const TEST_TOKEN = "correcttoken"

export class TestClient implements IClient {
    private _token: string | undefined = undefined
    public Token() { return this._token }
    public Entries: Entry[] = []
    public Categories: Category[] = []
    async IsLoggedIn() {
        return this._token === TEST_TOKEN
    }
    async Login(username: string, pass: string) {
        const loggedIn = username === TEST_USER_NAME && pass === TEST_PASSWORD;
        if(loggedIn) {
            this._token = TEST_TOKEN
        }
        return this.IsLoggedIn();
    }

    Logout() {
        this._token = ""
    }

    async LoginByToken(token: string) {
        const loggedIn = token === TEST_TOKEN
        if(loggedIn) {
            this._token = token
        }
        return loggedIn
    }

    async GetEntriesByDate(date: Date): Promise<Entry[]> {
        return this.Entries
            .filter(entry => sameDate(entry.date, date))
    }

    async AddEntry(entry: Entry): Promise<boolean> {
        this.Entries.push(entry)
        return true
    }

    async DeleteEntry(id: number): Promise<boolean> {
        this.Entries = this.Entries.filter(e => e.id !== id)
        return true
    }

    async GetCategories(): Promise<Category[]> {
        return this.Categories
    }

    async AddCategory(categoryName: string):Promise<boolean> {
        this.Categories.push(new Category(this.Categories.length + 1, categoryName))
        return true
    }
}