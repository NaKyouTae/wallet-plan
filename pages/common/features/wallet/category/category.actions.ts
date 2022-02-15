import {Month, Year} from "../../../interfaces/wallet";

export interface PlanTabAction {
    type: PlanTabActionType
    payload: {
        yearItem?: Year
        monthItem?: Month
    }
}

// eslint-disable-next-line no-shadow
export enum PlanTabActionType {
    YEAR_TAB_CREATE = "plan/year/tab/create",
    YEAR_TAB_DESTROY = "plan/year/tab/destroy",
    YEAR_TAB_UPDATE = "plan/year/tab/update",
    MONTH_TAB_CREATE = "plan/month/tab/create",
    MONTH_TAB_DESTROY = "plan/month/tab/destroy",
    MONTH_TAB_UPDATE = "plan/month/tab/update"
}
