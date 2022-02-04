
export default class LocalStorageUtils {
    constructor() {
    }

    static getItem(key: string) {
        return localStorage.getItem(key)
    }

    static setItem(key: string, value: any) {
        localStorage.setItem(key, value)
    }
}

