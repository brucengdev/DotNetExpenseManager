import { Comparable } from "./Comparable"

export class Tag implements Comparable<Tag> {
    public id: number = 0
    public name: string = ""

    constructor(id: number, name: string) {
        this.id = id
        this.name = name
    }
    Equals(other: Tag): boolean {
        return this.id === other.id
            && this.name === other.name
    }
}