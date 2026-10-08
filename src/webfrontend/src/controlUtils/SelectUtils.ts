import { SelectOption } from "../controls/Select";

export function buildYearSelectOptions(currentYear: number, oldestYear: number) {
    const yearOptions: SelectOption[] = [];
    for (let year = currentYear; year >= oldestYear; year--) {
        yearOptions.push({
            value: year.toString(),
            text: year.toString()
        });
    }
    return yearOptions;
}
