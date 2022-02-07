import {Bank, MonthItem, Plan, PlanItem, YearItem} from "../../../interfaces/plan";

export interface PlanAction {
    type: string
    payload: {
        plan?: Plan
        yearItem?: YearItem
        monthItem?: MonthItem
        planItem?: PlanItem
        bank?: Bank
    }
}
