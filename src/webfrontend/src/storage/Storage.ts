export const STORED_TOKEN = "token"

export interface IStorage {
    Set: (key: string, value: any) => void
    Get: (key: string) => any
}

export class Storage implements IStorage {
    public Set(key: string, value: any) {
        localStorage.setItem(key, value)
    }

    public Get(key: string) {
        return localStorage.getItem(key)
    }
}