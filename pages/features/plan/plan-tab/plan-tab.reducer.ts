import {planSample} from "../../../models/plan-sample.model";
import {MonthItem, Plan} from "../../../interfaces/plan";
import {PlanAction} from "./plan-tab.actions";

const initialState = planSample

// eslint-disable-next-line default-param-last
export default function planTabReducer(state: Plan = initialState, action: PlanAction) {

    switch(action.type) {
        case "plan/month/tabAdded":
            return {
                ...state,
                years: state.years.map((year) => {
                    if(year.id !== action.payload.yearItem?.id) {
                            return year
                        }

                        return {
                            ...year.months,
                            months: year.months.push(<MonthItem>{
                                id: `${year.year}-${action.payload.monthItem?.month}`,
                                year: year.year,
                                month: action.payload.monthItem?.month,
                                salary: 0,
                                used: 0,
                                plans: []
                            })
                        }
                    }
                )
            }
        default:
            return state
    }
}
