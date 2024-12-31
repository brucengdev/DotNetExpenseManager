
export function sameDate(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear()
        && date1.getMonth() === date2.getMonth()
        && date1.getDate() === date2.getDate()
}

export function formatDateToDay(date: Date): string {
    return `${date.getFullYear()}-${formatMonth(date.getMonth())}-${formatDate(date.getDate())}`
}

function formatMonth(monthNumber: number): string {
    return (monthNumber + 1).toString().padStart(2, "0")
}

function formatDate(dateNumber: number): string {
    return (dateNumber).toString().padStart(2, "0")
}


