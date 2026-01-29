import { Comparable } from "./models/Comparable"

export function sameDate(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear()
        && date1.getMonth() === date2.getMonth()
        && date1.getDate() === date2.getDate()
}

export function formatDateToDay(date: Date): string {
    return `${date.getFullYear()}-${formatMonth(date.getMonth())}-${formatDate(date.getDate())}`
}

export function formatDisplayDate(date: Date): string {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

function formatMonth(monthNumber: number): string {
    return (monthNumber + 1).toString().padStart(2, "0")
}

function formatDate(dateNumber: number): string {
    return (dateNumber).toString().padStart(2, "0")
}

export function addDays(date: Date, days: number) {
    const clonedDate = new Date(date)
    clonedDate.setDate(date.getDate() + days)
    return clonedDate
}

export function areSame<T extends Comparable<T>>(first: T[], second: T[]): boolean {
    if(first.length !== second.length) {
        return false
    }

    for(let i = 0; i < first.length; i++) {
        if(!first[i].Equals(second[i])) {
            return false
        }
    }

    return true
}