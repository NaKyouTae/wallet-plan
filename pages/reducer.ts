import {combineReducers} from "redux";
import planTabReducer from "./features/plan/plan-tab/plan-tab.reducer";

const rootReducer = combineReducers({
    planTabs: planTabReducer,
})

export default rootReducer
