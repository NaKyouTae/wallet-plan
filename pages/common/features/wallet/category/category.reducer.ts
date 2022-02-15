import {HYDRATE} from "next-redux-wrapper";
import {Month, Wallet, Year} from "../../../interfaces/wallet";
import {PlanTabAction, PlanTabActionType} from "./category.actions";
import UuidUtil from "../../../utils/uuid.util";

const initialState: Wallet = {
    id: UuidUtil.getUUID(),
    userId: UuidUtil.getUUID(),
    years : [
        {
            id: "",
            walletId: "",
            year: "",
            months: [
                {
                    id: "",
                    yearId: "",
                    year: "",
                    month: "",
                    salary: 0,
                    usedAmount: 0,
                    useAbleAmount: 0,
                    plans: [
                        {
                            id: "",
                            monthId: "",
                            bank: {
                                id: "",
                                planItemId: "",
                                account: "",
                                name: "",
                                nicName: ""
                            },
                            totalAmount: 0,
                            amounts: [],
                            usedPlace: [],
                            paymentMonth: [],
                            paid: [],
                            remark: ""
                        }
                    ],
                }
            ]
        }
    ]
}
// hooks
// hydration
// persist
// redux hooks form
export default function categoryReducer(state: Wallet = initialState, action: PlanTabAction) {

    switch(action.type) {
        case PlanTabActionType.YEAR_TAB_CREATE:
            state.years.push(<Year>action.payload.yearItem)

            return {
                ...state
            }
        case PlanTabActionType.YEAR_TAB_DESTROY:
            if (action.payload.yearItem) {
                const idx = state.years.indexOf(action.payload.yearItem)
                state.years.splice(idx, 1)
            }

            return {
                ...state
            }
        case PlanTabActionType.YEAR_TAB_UPDATE:
            if (action.payload.yearItem) {
                const idx = state.years.indexOf(action.payload.yearItem)
                // eslint-disable-next-line no-param-reassign
                state.years[idx] = action.payload.yearItem
            }

            return {
                ...state
            }
        case PlanTabActionType.MONTH_TAB_CREATE:
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
        case PlanTabActionType.MONTH_TAB_DESTROY:
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
        case PlanTabActionType.MONTH_TAB_UPDATE:
            state.years.map((year) => {
                if(year.id === action.payload.monthItem?.yearId) {
                    if (action.payload.monthItem) {
                        const idx = year.months.indexOf(action.payload.monthItem)
                        // eslint-disable-next-line no-param-reassign
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
        default:
            return state
    }
}
