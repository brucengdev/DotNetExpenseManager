export const STORED_TOKEN = "token"

export interface IStorage {
    Set: (key: string, value: any) => void
    Get: (key: string) => any
    Clear: (key: string) => void
}

export class Storage implements IStorage {
    public Set(key: string, value: any) {
        localStorage.setItem(key, value)
    }

    public Clear(key: string) {
        localStorage.removeItem(key)
    }

    public Get(key: string) {
        return localStorage.getItem(key)
    }
}