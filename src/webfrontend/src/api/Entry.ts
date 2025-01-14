import { sameDate } from "../utils"

export class Entry {
    public id: number = 0
    public title: string = ""
    public value: number = 0
    public date: Date = new Date()

    constructor(id: number, date: Date, title: string, value: number) {
        this.id = id
        this.date = date
        this.title = title
        this.value = value
    }

    public Equals(other: Entry): boolean {
        return this.title === other.title
                && this.value === other.value
                && sameDate(this.date, other.date)
    }
}