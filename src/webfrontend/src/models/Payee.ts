import { Comparable } from "./Comparable"

export class Payee implements Comparable<Payee> {
    public id: number = 0
    public name: string = ""

    constructor(id: number, name: string) {
        this.id = id
        this.name = name
    }
    Equals(other: Payee): boolean {
        return this.id === other.id
            && this.name === other.name
    }
}