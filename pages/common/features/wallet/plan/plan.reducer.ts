import {Wallet, Plan} from "../../../interfaces/wallet";
import {PlanAction, PlanActionType} from "./plan.action";
import UuidUtil from "../../../utils/uuid.util";

// const initialState: PlanItem = {
//     id: "",
//     monthId: "",
//     bank: {
//         id: "",
//         planItemId: "",
//         account: "",
//         name: "",
//         nicName: ""
//     },
//     totalAmount: 0,
//     amounts: [],
//     usedPlace: [],
//     paymentMonth: [],
//     paid: [],
//     remark: ""
// }

const initialState = {
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
                            amounts: 0,
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

export default function planReducer(state: Plan = initialState, action: PlanAction) {
    switch (action.type) {
        case PlanActionType.PLAN_CREATE:
            state.years.map((year) => {
                if(year.id === action.payload.planItem?.yearId) {
                    year.months.map((month) => {
                        if(month.id === action.payload.planItem?.monthId) {
                            if (action.payload.planItem) {
                                month.plans.push(action.payload.planItem)
                            }
                        }
                    })
                }
            })

            return {...state}
        case PlanActionType.PLAN_UPDATE:
            state.years.map((year) => {
                if(year.id === action.payload.planItem?.yearId) {
                    year.months.map((month) => {
                        if(month.id === action.payload.planItem?.monthId) {
                            if (action.payload.planItem) {
                                const item = action.payload.planItem
                                const idx = month.plans.indexOf(item)
                                month.plans[idx] = item
                            }
                        }
                    })
                }
            })
            return {...state}
        case PlanActionType.PLAN_DESTROY:
            state.years.map((year) => {
                if(year.id === action.payload.planItem?.yearId) {
                    year.months.map((month) => {
                        if(month.id === action.payload.planItem?.monthId) {
                            if (action.payload.planItem) {
                                const item = action.payload.planItem
                                const idx = month.plans.indexOf(item)
                                month.plans.splice(idx, 1)
                            }
                        }
                    })
                }
            })
            return {...state}
        default:
            return state
    }
}
