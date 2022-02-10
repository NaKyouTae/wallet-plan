export interface Plan {
    id: string
    userId: string
    years: Array<YearItem>
}

export interface YearItem {
    id: string,
    userId: string
    year: string,
    months: Array<MonthItem>
}

export interface MonthItem {
    id: string,
    userId: string,
    yearId: string,
    year: string,
    month: string,
    salary: number,
    usedAmount: number,
    useAbleAmount: number,
    plans: Array<PlanItem>,
}

export interface PlanItem {
    id: string,
    userId: string
    yearId: string
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
    bankName: string
    bankNicName?: string
}
