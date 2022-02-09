import {PlanItem} from "../../../interfaces/plan";
import {PlanItemAction, PlanItemActionType} from "./plan-item.action";

const initialState: PlanItem = {
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
    amounts: [],
    usedPlace: [],
    paymentMonth: [],
    paid: [],
    remark: ""
}

export default function planItemReducer(state: PlanItem = initialState, action: PlanItemAction) {
    switch (action.type) {
        case PlanItemActionType.PLAN_ITEM_CREATE:
            return {...state}
        case PlanItemActionType.PLAN_ITEM_UPDATE:
            return {...state}
        case PlanItemActionType.PLAN_ITEM_DESTROY:
            return {...state}
        default:
            return state
    }
}
