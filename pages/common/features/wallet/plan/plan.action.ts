import { Plan } from "../../../interfaces/wallet";

export interface PlanAction {
    type: string
    payload: {
        planItem?: Plan
    }
}

// eslint-disable-next-line no-shadow
export enum PlanActionType {
    PLAN_CREATE = "plan/create",
    PLAN_UPDATE = "plan/update",
    PLAN_DESTROY = "plan/destroy"
}
