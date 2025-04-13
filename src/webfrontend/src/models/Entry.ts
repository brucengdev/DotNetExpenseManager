import { Comparable } from "./Comparable"
import { sameDate } from "../utils"

export class Entry implements Comparable<Entry>{
    public id: number = 0
    public title: string = ""
    public value: number = 0
    public date: Date = new Date()
    public categoryId: number | undefined = undefined

    constructor(id: number, 
        date: Date, 
        title: string, 
        value: number,
        categoryId: number = 0) {
        this.id = id
        this.date = date
        this.title = title
        this.value = value
        this.categoryId = categoryId
    }

    public Equals(other: Entry): boolean {
        return this.title === other.title
                && this.value === other.value
                && sameDate(this.date, other.date)
                && this.categoryId === other.categoryId
    }
}