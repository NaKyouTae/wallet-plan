import {User} from "../../interfaces/user.interface";
import {UserAction, UserActionType} from "./user.action";

const initialState = {
    id: "",
    name: ""
}

export default function userReducer(state: User = initialState, action: UserAction) {
    switch (action.type) {
        case UserActionType.USER_UPDATE:
            state = action.payload.user
            return {
                ...state
            }
        default:
            return state
    }
}
