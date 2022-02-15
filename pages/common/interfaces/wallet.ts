export interface Wallet {
    id: string
    userId: string
    years: Array<Year>
}

export interface Year {
    id: string,
    walletId: string
    year: string,
    months: Array<Month>
}

export interface Month {
    id: string,
    yearId: string,
    year: string,
    month: string,
    salary: number,
    usedAmount: number,
    useAbleAmount: number,
    plans: Array<Plan>,
}

export interface Plan {
    id: string,
    monthId: string
    bank: Bank,
    totalAmount: number,
    amounts: Array<number>,
    usedPlace: Array<string>,
    paymentMonth: Array<string>,
    paid: Array<boolean>,
    remark: string
}

export interface Bank {
    id: string
    planItemId: string
    account: string
    name: string
    nicName?: string
}
