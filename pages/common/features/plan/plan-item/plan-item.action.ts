import { PlanItem } from "../../../interfaces/plan";

export interface PlanItemAction {
    type: string
    payload: {
        planItem?: PlanItem
    }
}

// eslint-disable-next-line no-shadow
export enum PlanItemActionType {
    PLAN_ITEM_CREATE = "plan/item/create",
    PLAN_ITEM_UPDATE = "plan/item/update",
    PLAN_ITEM_DESTROY = "plan/item/destroy"
}
