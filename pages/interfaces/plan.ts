export interface Plan {
    years: Array<YearItem>
}

export interface YearItem {
    year: number,
    months: Array<MonthItem>
}

export interface MonthItem {
    year: number,
    month: number,
    plans: Array<PlanItem>,
}

export interface Bank {
    account: string
    bankName: string
    bankNicName?: string
}

export interface PlanItem {
    bank: Bank,
    totalAmount: number,
    amounts: Array<number>,
    usedPlace: Array<string>,
    paymentMonth: Array<string>,
    paid: Array<boolean>,
    remark: string
}
