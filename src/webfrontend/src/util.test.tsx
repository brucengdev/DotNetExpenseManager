import { describe, expect, it } from "vitest";
import { Comparable } from "./models/Comparable";
import { areSame } from "./utils";

class TestElement implements Comparable<TestElement> {
    public Value: string = ""
    constructor(value: string) {
        this.Value = value
    }
    Equals(other: TestElement): boolean {
        return this.Value === other.Value
    }
    
}

describe('areSame', () => {
    it(' returns false when lengths are different', () => {
        const first = [
            new TestElement("dog"),
            new TestElement("cat")
        ]
        const second = [
            new TestElement("dog")
        ]
        expect(areSame(first, second)).toBeFalsy()
    })

    it(' returns false when values are not equal', () => {
        const first = [
            new TestElement("dog"),
            new TestElement("cat")
        ]
        const second = [
            new TestElement("dog"),
            new TestElement("tiger")
        ]
        expect(areSame(first, second)).toBeFalsy()
    })

    it(' returns true when values equal', () => {
        const first = [
            new TestElement("dog"),
            new TestElement("cat")
        ]
        const second = [
            new TestElement("dog"),
            new TestElement("cat")
        ]
        expect(areSame(first, second)).toBeTruthy()
    })
})