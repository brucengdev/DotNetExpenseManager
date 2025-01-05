export interface IStorage {
    Set: (key: string, value: any) => void
    Get: (key: string) => any
}