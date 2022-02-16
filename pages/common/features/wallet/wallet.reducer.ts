import {Month, Wallet, Year} from "../../interfaces/wallet";
import UuidUtil from "../../utils/uuid.util";
import {WalletAction, WalletActionType} from "./wallet.action";

const initialState: Wallet = {
    id: UuidUtil.getUUID(),
    userId: UuidUtil.getUUID(),
    years: [<Year>{}]
    // years : [
    //     {
    //         id: "",
    //         walletId: "",
    //         year: "",
    //         months: [
    //             {
    //                 id: "",
    //                 yearId: "",
    //                 year: "",
    //                 month: "",
    //                 salary: 0,
    //                 usedAmount: 0,
    //                 useAbleAmount: 0,
    //                 plans: [
    //                     {
    //                         id: "",
    //                         yearId: "",
    //                         monthId: "",
    //                         bank: {
    //                             id: "",
    //                             yearId: "",
    //                             monthId: "",
    //                             planId: "",
    //                             account: "",
    //                             name: "",
    //                             nicName: ""
    //                         },
    //                         totalAmount: 0,
    //                         amounts: [],
    //                         usedPlace: [],
    //                         paymentMonth: [],
    //                         paid: [],
    //                         remark: ""
    //                     }
    //                 ],
    //             }
    //         ]
    //     }
    // ]
}
// hooks
// hydration
// persist
// redux hooks form

export default function walletReducer(state: Wallet = initialState, action: WalletAction) {
    switch(action.type) {
        case WalletActionType.YEAR_CREATE:
            state.years.push(<Year>action.payload.yearItem)

            return {
                ...state
            }
        case WalletActionType.YEAR_DESTROY:
            if (action.payload.yearItem) {
                const idx = state.years.indexOf(action.payload.yearItem)
                state.years.splice(idx, 1)
            }

            return {
                ...state
            }
        case WalletActionType.YEAR_UPDATE:
            if (action.payload.yearItem) {
                const idx = state.years.indexOf(action.payload.yearItem)
                state.years[idx] = action.payload.yearItem
            }

            return {
                ...state
            }
        case WalletActionType.MONTH_CREATE:
            state.years.map((year) => {
                if (year.id === action.payload.monthItem?.yearId) {
                    year.months.push(<Month>action.payload.monthItem)
                    return {
                        ...year,
                        months: year.months
                    }
                }

                return year
            })

            return {
                ...state
            }
        case WalletActionType.MONTH_DESTROY:
            state.years.map((year) => {
                if(year.id === action.payload.monthItem?.yearId) {
                    if (action.payload.monthItem) {
                        const idx = year.months.indexOf(action.payload.monthItem)
                        year.months.splice(idx, 1)
                    }

                    return {
                        ...year,
                        months: year.months
                    }
                }

                return year
            })
            return {
                ...state
            }
        case WalletActionType.MONTH_UPDATE:
            state.years.map((year) => {
                if(year.id === action.payload.monthItem?.yearId) {
                    if (action.payload.monthItem) {
                        const idx = year.months.indexOf(action.payload.monthItem)
                        year.months[idx] = action.payload.monthItem
                    }

                    return {
                        ...year,
                        months: year.months
                    }
                }

                return year
            })
            return {
                ...state
            }
        case WalletActionType.PLAN_CREATE:
            const {planItem} = action.payload
            const selectedYear = state.years.filter((year: Year) => year.id === planItem?.yearId)
            const selectedYearIdx = state.years.indexOf(selectedYear[0])

            // @ts-ignore
            state.years[selectedYearIdx] = selectedYear?.forEach((year) => {
                const selectedMonth = year.months.filter((month: Month) => month.id === planItem?.monthId)

                selectedMonth?.forEach((month: Month) => {
                    // @ts-ignore
                    return month.plans.push(planItem);
                })
            })

            return {
                ...state
            }
        case WalletActionType.PLAN_UPDATE:
            return {
                ...state
            }
        case WalletActionType.PLAN_DESTROY:
            return {
                ...state
            }
        case WalletActionType.BANK_CREATE:
            return {
                ...state
            }
        case WalletActionType.BANK_UPDATE:
            return {
                ...state
            }
        case WalletActionType.BANK_DESTROY:
            return {
                ...state
            }
        default:
            return state
    }
}
