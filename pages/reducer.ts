import {combineReducers} from "redux";
import planTabReducer from "./common/features/plan/plan-tab/plan-tab.reducer";

const rootReducer = combineReducers({
    plan: planTabReducer,
    // chart:
})

export default rootReducer
