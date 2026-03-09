import { Comparable } from "./Comparable"
import { sameDate } from "../utils"

export class Entry implements Comparable<Entry>{
    public id: number = 0
    public title: string = ""
    public value: number = 0
    public date: Date = new Date()
    public categoryId: number | undefined = undefined
    public tagIds: number[] = []
    public payeeId: number | undefined = undefined
    public notes: string | undefined = undefined

    constructor(id: number, 
        date: Date, 
        title: string, 
        value: number,
        categoryId: number = 0,
        tagIds: number[] = [],
        payeeId: number | undefined = undefined,
        notes: string | undefined = undefined
    ) {
        this.id = id
        this.date = new Date(date)
        this.title = title
        this.value = value
        this.categoryId = categoryId
        this.tagIds = tagIds
        this.payeeId = payeeId
        this.notes = notes
    }

    public static FromOther(entry: Entry): Entry {
        return new Entry(
            entry.id, 
            new Date(entry.date),
            entry.title,
            entry.value,
            entry.categoryId ?? 0,
            entry.tagIds,
            entry.payeeId,
            entry.notes
        )
    }

    public Equals(other: Entry): boolean {
        const hasSameTags = this.tagIds.every(tId => other.tagIds.includes(tId)) 
            && this.tagIds.length === other.tagIds.length
        return this.title === other.title
                && this.value === other.value
                && sameDate(this.date, other.date)
                && this.categoryId === other.categoryId
                && hasSameTags
                && this.payeeId === other.payeeId
                && this.notes === other.notes
    }
}