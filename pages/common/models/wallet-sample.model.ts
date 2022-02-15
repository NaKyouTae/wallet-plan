import slash from "slash";
import {Bank, Month, Wallet, Plan, Year} from "../interfaces/wallet";
import UuidUtil from "../utils/uuid.util";

const userId = UuidUtil.getUUID()

const getYear = (year: string): Year => {
    const yearId = UuidUtil.getUUID()
    return {
        id: yearId,
        walletId: userId,
        year,
        months: [getMonth(yearId, year, "10")]
    }
}

const getMonth = (yearId: string, year: string, month: string): Month => {
    const monthId = UuidUtil.getUUID()
    const plans = [getPlanItem(monthId), getPlanItem(monthId), getPlanItem(monthId)]
    const salary = 1000000
    const usedAmount = plans.map(plan => plan.totalAmount).reduce((acc, value) => acc + value)
    const useAbleAmount = salary - usedAmount
    return {
        id: monthId,
        userId,
        yearId,
        year,
        month,
        salary,
        usedAmount,
        useAbleAmount,
        plans,
    }
}

const getPlanItem = (monthId: string): Plan => {
    const planItemId = UuidUtil.getUUID()
    const amounts = [10000, 10000, 20000, 40000]
    const totalAmount = amounts.reduce((acc, value) => acc + value)
    return {
        id: planItemId,
        userId,
        monthId,
        bank: getBank(planItemId),
        totalAmount,
        amounts,
        usedPlace: ["조카 용돈", "조카 용돈", "조카 용돈", "조카 용돈"],
        paymentMonth: [],
        paid: [true, true, false, false],
        remark: "테스트"
    }
}

const getBank = (planItemId: string): Bank => {
    const bankId = UuidUtil.getUUID()
    return {
        id: bankId,
        planItemId,
        account: "12352345-34543-23432",
        name: "TOSS"
    }
}

export const planSample: Wallet = {
    id: UuidUtil.getUUID(),
    userId: UuidUtil.getUUID(),
    years : [
        getYear("2017")
    ]
}
