
export class localStorageService {
    constructor() {
    }

    getItem(key: string) {
        return localStorage.getItem(key)
    }

    setItem(key: string, value: any) {
        localStorage.setItem(key, value)
    }
}

