//--------------= FriendsReducer =---------- //

import {ASYNC_DEL_FRIEND, ASYNC_GET_FRIENDS, DEL_FRIEND, GET_FRIENDS} from "../store/friendsReducer";
import {ASYNC_AUTH_USER, ASYNC_REGISTER_USER, AUTH_USER, LOGOUT_USER} from "../store/authReducer";
import {CurrentUserType} from "./stateTypes";
import {
    ADD_MESSAGE,
    ADD_USERS_WHO_HAVE_MESSAGES,
    ASYNC_ADD_MESSAGE,
    ASYNC_CHANGE_USERS_WHO_HAVE_MESSAGES, ASYNC_GET_MESSAGES_USER,
    ASYNC_GET_USERS_WHO_HAVE_MESSAGES,
    CHANGE_USERS_WHO_HAVE_MESSAGES, GET_MESSAGES_USER,
    GET_USERS_WHO_HAVE_MESSAGES, IS_REDIRECT_FROM_ANY_PAGE, SET_CURRENT_USER
} from "../store/messageReducer";

export type GetFriendsActionType = {
    type: typeof GET_FRIENDS
    payload: string
}

export type AsyncGetFriendsActionType = {
    type: typeof ASYNC_GET_FRIENDS
    payload: number
}

export type DelFriendActionType = {
    type: typeof DEL_FRIEND
    payload: number
}


export type AsyncDelFriendActionType = {
    type: typeof ASYNC_DEL_FRIEND
    payload: object
}

export type ActionsType = GetFriendsActionType | AsyncGetFriendsActionType | DelFriendActionType | AsyncDelFriendActionType

//--------------= AuthReducer =---------- //

export type SetAuthUserActionType = {
    type: typeof AUTH_USER
    payload: object
}

export type AsyncSetAuthUserActionType = {
    type: typeof ASYNC_AUTH_USER
    payload: AuthUser
}

export type AsyncSetRegisterUserActionType = {
    type: typeof ASYNC_REGISTER_USER
    payload: AuthUser
}


export type AuthUser = {
    email: string,
    password: string,
}


export type LogoutUserType = {
    type: typeof LOGOUT_USER
    payload: LogoutUser
}

export type LogoutUser = {
    userId: number | null,
    token: string | null
}


export type AuthReducerActionsType = SetAuthUserActionType | LogoutUserType

//--------------= MessageReducer =---------- //


export type AddMessageActionCreatorType = {
    type: typeof ADD_MESSAGE
    payload: AddMessageType
}

export type AddMessageType = {
    id: number,
    message: string,
    userToId: number,
    userFromId: number,
    created_at:string,
}


export type AsyncAddMessageActionCreatorType = {
    type: typeof ASYNC_ADD_MESSAGE
    payload: MessageType
}

export type MessageType = {
    message:string | null,
    userToId:number | null,
    userFromId:number | null,
    login: string | null,
    created_at: string | null,
}


export type AddUsersWhoHaveMessagesActionType = {
    type: typeof ADD_USERS_WHO_HAVE_MESSAGES
    payload: AddUsersMessagesType
}

export type AddUsersMessagesType = {
    id: number,
    login: string,
    avatar:string,

}

export type GetUsersWhoHaveMessagesActionType = {
    type: typeof GET_USERS_WHO_HAVE_MESSAGES
    payload: Array<MyUsersType>
}



export type MyUsersType = {
    id: number | null,
    content: string | null,
    login: string | null,
    avatar:string | null,
    created_at:string | null,
}

export type AsyncGetUsersWhoHaveMessagesActionType = {
    type: typeof ASYNC_GET_USERS_WHO_HAVE_MESSAGES
    payload: number
}

export type ChangeUsersWhoHaveMessagesActionType = {
    type: typeof CHANGE_USERS_WHO_HAVE_MESSAGES
    payload: number | null
}

export type AsyncChangeUsersWhoHaveMessagesActionType = {
    type: typeof ASYNC_CHANGE_USERS_WHO_HAVE_MESSAGES
    payload: number | null
}


export type GetMessagesUserActionType = {
    type: typeof GET_MESSAGES_USER
    payload: Array<MessagesUser>
}



export type MessagesUser = {
    id: number | null,
    content: string | null,
    login: string | null,
    created_at: string | null,
    user_from_id: number | null,
}

export type AsyncGetMessagesUserActionType = {
    type: typeof ASYNC_GET_MESSAGES_USER
    payload: GetMessagesUsers
}

export type GetMessagesUsers = {
    userId:number | null,
    friendsId: number | null,
}

export type SetCurrentUserActionType = {
    type: typeof SET_CURRENT_USER
    payload: CurrentUserType
}

export type IsRedirectFromAnyPageActionType = {
    type: typeof IS_REDIRECT_FROM_ANY_PAGE
    payload: boolean
}

export type MessageReducerActionsType = AddMessageActionCreatorType | AddUsersWhoHaveMessagesActionType | GetUsersWhoHaveMessagesActionType |
    ChangeUsersWhoHaveMessagesActionType | GetMessagesUserActionType | SetCurrentUserActionType | IsRedirectFromAnyPageActionType

