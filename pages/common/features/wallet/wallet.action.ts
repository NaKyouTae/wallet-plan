import {Bank, Month, Plan, Year} from "../../interfaces/wallet";

export interface WalletAction {
    type: WalletActionType
    payload: {
        yearItem?: Year
        monthItem?: Month
        planItem?: Plan
        bankItem?: Bank
    }
}

export enum WalletActionType {
    // YEAR
    YEAR_CREATE = "wallet/year/create",
    YEAR_DESTROY = "wallet/year/destroy",
    YEAR_UPDATE = "wallet/year/update",
    // MONTH
    MONTH_CREATE = "wallet/month/create",
    MONTH_DESTROY = "wallet/month/destroy",
    MONTH_UPDATE = "wallet/month/update",
    // PLAN
    PLAN_CREATE = "wallet/plan/create",
    PLAN_DESTROY = "wallet/plan/destroy",
    PLAN_UPDATE = "wallet/plan/update",
    // BANK
    BANK_CREATE = "wallet/bank/create",
    BANK_DESTROY = "wallet/bank/destroy",
    BANK_UPDATE = "wallet/bank/update"
}
