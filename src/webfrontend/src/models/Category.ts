import { Comparable } from "./Comparable"

export class Category implements Comparable<Category> {
    public id: number = 0
    public name: string = ""

    constructor(id: number, name: string) {
        this.id = id
        this.name = name
    }
    Equals(other: Category): boolean {
        return this.id === other.id
            && this.name === other.name
    }
}