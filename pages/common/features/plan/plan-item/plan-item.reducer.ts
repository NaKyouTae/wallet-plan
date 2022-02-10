import {Plan, PlanItem} from "../../../interfaces/plan";
import {PlanItemAction, PlanItemActionType} from "./plan-item.action";
import UuidUtil from "../../../utils/uuid.util";

// const initialState: PlanItem = {
//     id: "",
//     userId: "",
//     monthId: "",
//     bank: {
//         id: "",
//         planItemId: "",
//         account: "",
//         bankName: "",
//         bankNicName: ""
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
            userId: "",
            year: "",
            months: [
                {
                    id: "",
                    userId: "",
                    yearId: "",
                    year: "",
                    month: "",
                    salary: 0,
                    usedAmount: 0,
                    useAbleAmount: 0,
                    plans: [
                        {
                            id: "",
                            userId: "",
                            monthId: "",
                            bank: {
                                id: "",
                                planItemId: "",
                                account: "",
                                bankName: "",
                                bankNicName: ""
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

export default function planItemReducer(state: Plan = initialState, action: PlanItemAction) {
    switch (action.type) {
        case PlanItemActionType.PLAN_ITEM_CREATE:
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
        case PlanItemActionType.PLAN_ITEM_UPDATE:
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
        case PlanItemActionType.PLAN_ITEM_DESTROY:
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
