export interface Plan {
    years: Array<YearItem>
}

export interface YearItem {
    id: string,
    year: string,
    months: Array<MonthItem>
}

export interface MonthItem {
    id: string,
    year: string,
    month: string,
    salary: number,
    used: number,
    plans: Array<PlanItem>,
}

export interface PlanItem {
    id: string,
    bank: Bank,
    totalAmount: number,
    amounts: Array<number>,
    usedPlace: Array<string>,
    paymentMonth: Array<string>,
    paid: Array<boolean>,
    remark: string
}

export interface Bank {
    account: string
    bankName: string
    bankNicName?: string
}
