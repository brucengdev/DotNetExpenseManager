import { Category } from "../models/Category";
import { IClient } from "../api/Client";
import { Entry } from "../models/Entry";
import { sameDate } from "../utils";
import { Tag } from "../models/Tag";
import { Payee } from "../models/Payee";
import { MonthlyReport } from "../models/MonthlyReport";

export const TEST_USER_NAME = "valid_user"
export const TEST_PASSWORD = "correct_pass"
export const TEST_TOKEN = "correcttoken"

export class TestClient implements IClient {
    private _token: string | undefined = undefined
    public Token() { return this._token }
    public Entries: Entry[] = []
    public Categories: Category[] = []
    public Tags: Tag[] = []
    public Payees: Payee[] = []
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
        this.Entries = [...this.Entries, entry]
        return true
    }

    async DeleteEntry(id: number): Promise<boolean> {
        this.Entries = this.Entries.filter(e => e.id !== id)
        return true
    }

    async GetCategories(): Promise<Category[]> {
        return [...this.Categories]//use spread to return a clone to simulate how react state updates
    }

    async AddCategory(categoryName: string):Promise<boolean> {
        this.Categories = [...this.Categories, new Category(this.Categories.length + 1, categoryName)]
        return true
    }

    async GetTags(): Promise<Tag[]> {
        return [...this.Tags]//use spread to return a clone to simulate how react state updates
    }

    async AddTag(tagName: string):Promise<boolean> {
        this.Tags = [...this.Tags, new Tag(this.Tags.length + 1, tagName)]
        return true
    }

    async GetPayees(): Promise<Payee[]> {
        return [...this.Payees]//use spread to return a clone to simulate how react state updates
    }

    async AddPayee(payeeName: string):Promise<boolean> {
        this.Payees = [...this.Payees, new Payee(this.Payees.length + 1, payeeName)]
        return true
    }

    async GetMonthlyReport(_: Date): Promise<MonthlyReport> {
        //this function should be replaced in tests
        //no real implementation here
        return {
            byCategories: {
                "Cat1": 10,
                "Cat2": -2
            },
            totalIncome:0,
            totalSpendings: 0,
            savings: 0
        }
    }
}