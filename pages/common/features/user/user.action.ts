import {User} from "../../interfaces/user.interface";

export interface UserAction {
    type: string
    payload: {
        user: User
    }
}

// eslint-disable-next-line no-shadow
export enum UserActionType {
    USER_UPDATE = "user/update",
}
