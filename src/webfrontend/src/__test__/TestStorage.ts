import { IStorage } from "../storage/Storage";

export class TestStorage implements IStorage {
    private data: any = {}
    public Set(key: string, value: any) {
        this.data[key] = value
    }

    public Clear(key: string) {
        delete this.data[key]
    }

    public Get(key: string) {
        return this.data[key]
    }
}