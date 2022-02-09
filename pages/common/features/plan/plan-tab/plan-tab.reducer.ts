import {HYDRATE} from "next-redux-wrapper";
import {MonthItem, Plan, YearItem} from "../../../interfaces/plan";
import {PlanTabAction, PlanTabActionType} from "./plan-tab.actions";
import UuidUtil from "../../../utils/uuid.util";

const initialState = {
    id: UuidUtil.getUUID(),
    userId: UuidUtil.getUUID(),
    years : [
        // {
        //     id: "",
        //     userId: "",
        //     year: "",
        //     months: [
        //         {
        //             id: "",
        //             userId: "",
        //             yearId: "",
        //             year: "",
        //             month: "",
        //             salary: 0,
        //             usedAmount: 0,
        //             useAbleAmount: 0,
        //             plans: [
        //                 {
        //                     id: "",
        //                     userId: "",
        //                     monthId: "",
        //                     bank: {
        //                         id: "",
        //                         planItemId: "",
        //                         account: "",
        //                         bankName: "",
        //                         bankNicName: ""
        //                     },
        //                     totalAmount: 0,
        //                     amounts: 0,
        //                     usedPlace: [],
        //                     paymentMonth: [],
        //                     paid: [],
        //                     remark: ""
        //                 }
        //             ],
        //         }
        //     ]
        // }
    ]
}

export default function planTabReducer(state: Plan = initialState, action: PlanTabAction) {

    switch(action.type) {
        case PlanTabActionType.YEAR_TAB_CREATE:
            state.years.push(<YearItem>action.payload.yearItem)

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
                    year.months.push(<MonthItem>action.payload.monthItem)
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
