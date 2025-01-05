import { IStorage } from "../storage/Storage";

export class TestStorage implements IStorage {
    private data: any = {}
    public Set(key: string, value: any) {
        this.data[key] = value
    }

    public Get(key: string) {
        return this.data[key]
    }
}