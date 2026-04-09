import { Comparable } from "./models/Comparable"
import { Tag } from "./models/Tag"

export function sameDate(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear()
        && date1.getMonth() === date2.getMonth()
        && date1.getDate() === date2.getDate()
}

export function formatDateToDay(date: Date): string {
    return `${date.getFullYear()}-${formatMonth(date.getMonth())}-${formatDate(date.getDate())}`
}

export function formatDateToMonthYear(date: Date): string {
    return `${date.getFullYear()}-${formatMonth(date.getMonth())}`
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

export function addMonths(date: Date, months: number) {
    const clonedDate = new Date(date)
    clonedDate.setMonth(date.getMonth() + months)
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

const currency = Intl.NumberFormat("vi-VN", {
    style: 'currency',
    currency: 'VND'
})

export function formatMoney(money: number) {
    return currency.format(money)
}

export function buildTagsString(tagIds: number[], tags: Tag[]): string {
    if(tagIds === undefined || tagIds === null || tagIds.length === 0) {
        return ""
    }
    return tagIds.map(tagId => (tags ?? []).find(t => t.id === tagId)?.name ?? "")
        .join(",")
}