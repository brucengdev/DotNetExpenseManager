import { IClient } from "../api/Client";
import { Expense } from "../api/Expense";
import { sameDate } from "../utils";

export const TEST_USER_NAME = "valid_user"
export const TEST_PASSWORD = "correct_pass"

export class TestClient implements IClient {
    private _loggedIn = false;
    public Expenses: Expense[] = []
    async IsLoggedIn() {
        return this._loggedIn
    }
    async Login(username: string, pass: string) {
        this._loggedIn = username === TEST_USER_NAME && pass === TEST_PASSWORD;
        return this.IsLoggedIn();
    }

    async GetExpensesByDate(date: Date): Promise<Expense[]> {
        return this.Expenses
            .filter(entry => sameDate(entry.date, date))
    }

    async AddEntry(entry: Expense): Promise<boolean> {
        this.Expenses.push(entry)
        return true
    }
}