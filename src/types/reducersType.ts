//--------------= FriendsReducer =---------- //

import {ASYNC_DEL_FRIEND, ASYNC_GET_FRIENDS, DEL_FRIEND, GET_FRIENDS} from "../store/friendsReducer";
import {
    ASYNC_AUTH_USER, ASYNC_CHANGE_AVATAR_USER,
    ASYNC_CHANGE_LOGIN_USER,
    ASYNC_REGISTER_USER,
    AUTH_USER, CHANGE_AVATAR_USER, CHANGE_LOGIN_USER, changeAvatarUser, changeLoginUser,
    LOGOUT_USER
} from "../store/authReducer";
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
    payload: string
}

export type DelFriendActionType = {
    type: typeof DEL_FRIEND
    payload: string
}


export type AsyncDelFriendActionType = {
    type: typeof ASYNC_DEL_FRIEND
    payload: DeleteFriend
}

export type DeleteFriend = {
    userId: string,
    friendId: string,
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

export type changeLoginUserType = {
    type: typeof CHANGE_LOGIN_USER
    payload: string
}

export type AsyncChangeLoginUserActionType = {
    type: typeof ASYNC_CHANGE_LOGIN_USER
    payload: ChangeLogin
}

export type changeAvatarUserType = {
    type: typeof CHANGE_AVATAR_USER
    payload: ChangeAvatar
}

export type AsyncChangeAvatarUserActionType = {
    type: typeof ASYNC_CHANGE_AVATAR_USER
    payload: ChangeAvatar
}

export type LogoutUserType = {
    type: typeof LOGOUT_USER
    payload: LogoutUser
}


export type ChangeAvatar = {
    updatedAvatar: string
}

export type ChangeLogin = {
    updatedLogin: string
}


export type AuthUser = {
    email: string,
    password: string,
}

export type LogoutUser = {
    userId: string | null,
    token: string | null
}


export type AuthReducerActionsType = SetAuthUserActionType | LogoutUserType | changeAvatarUserType | changeLoginUserType

//--------------= MessageReducer =---------- //

export type MyUsersSagaType = {
    id: string,
    content: string,
    login: string,
    avatar: string,
    created_at: string,
    user_from_id:string
}


export type AddMessageActionCreatorType = {
    type: typeof ADD_MESSAGE
    payload: AddMessageType
}

export type AddMessageType = {
    id: string | null,
    message: string | null,
    userToId: string | null,
    userFromId: string | null,
    created_at:string | null,
}


export type AsyncAddMessageActionCreatorType = {
    type: typeof ASYNC_ADD_MESSAGE
    payload: MessageType
}

export type MessageType = {
    message:string | null,
    userToId:string | null,
    userFromId: string | null,
    login: string | null,
    created_at: string | null,
}



export type AddUsersWhoHaveMessagesActionType = {
    type: typeof ADD_USERS_WHO_HAVE_MESSAGES
    payload: AddUsersMessagesType
}

export type AddUsersMessagesType = {
    id: string,
    login: string,
    avatar:string,

}

export type GetUsersWhoHaveMessagesActionType = {
    type: typeof GET_USERS_WHO_HAVE_MESSAGES
    payload: Array<MyUsersType>
}



export type MyUsersType = {
    id: string | null,
    content: string | null,
    login: string | null,
    avatar:string | null,
    created_at:string | null,
}

export type AsyncGetUsersWhoHaveMessagesActionType = {
    type: typeof ASYNC_GET_USERS_WHO_HAVE_MESSAGES
}

export type ChangeUsersWhoHaveMessagesActionType = {
    type: typeof CHANGE_USERS_WHO_HAVE_MESSAGES
    payload: string | null
}

export type AsyncChangeUsersWhoHaveMessagesActionType = {
    type: typeof ASYNC_CHANGE_USERS_WHO_HAVE_MESSAGES
    payload: string | null
}


export type GetMessagesUserActionType = {
    type: typeof GET_MESSAGES_USER
    payload: Array<MessagesUser>
}



export type MessagesUser = {
    id: string | null,
    content: string | null,
    login: string | null,
    created_at: string | null,
    user_from_id: string | null,
    updatedAt?: Date
}

export type AsyncGetMessagesUserActionType = {
    type: typeof ASYNC_GET_MESSAGES_USER
    payload: GetMessagesUsers
}

export type GetMessagesUsers = {
    userId:string | null,
    friendsId: string | null,
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

