import {combineReducers} from "redux";
import categoryReducer from "./category/category.reducer";
import planReducer from "./plan/plan.reducer";

const walletReducer = combineReducers({
    walletCategory: categoryReducer,
    // user:
    // year:
    // month:
    plan: planReducer,
    // bank
})

export default walletReducer
