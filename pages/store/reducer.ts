import {combineReducers} from "redux";
import walletReducer from "../common/features/wallet/wallet.reducer";

const rootReducer = combineReducers({
    wallet: walletReducer,
    // chart:
})

export default rootReducer
