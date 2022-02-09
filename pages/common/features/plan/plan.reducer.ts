import {combineReducers} from "redux";
import planTabReducer from "./plan-tab/plan-tab.reducer";
import planItemReducer from "./plan-item/plan-item.reducer";

const planReducer = combineReducers({
    planTab: planTabReducer,
    planItem: planItemReducer,
})

export default planReducer
