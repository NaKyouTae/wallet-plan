
export default class LocalStorageUtils {
    constructor() {
    }

    static getItem(key: string) {
        if(window.localStorage !== undefined) {
            return window.localStorage.getItem(key)
        }

        return null
    }

    static setItem(key: string, value: any) {
        if(window.localStorage !== undefined) {
            return window.localStorage.setItem(key, value)
        }

        return null
    }
}

