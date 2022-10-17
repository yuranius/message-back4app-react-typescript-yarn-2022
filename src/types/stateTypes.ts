export type stateOverType = {
    over: overType
}

type overType = {
    loading: boolean
    message: string
    statusMessage: number,
}

export type stateUserType = {
    user: userType
}

type userType = {
    token: string
    userId: string
    avatar: string
    userLogin: string
}


export type stateMessageType = {
    message: messageType
}

type messageType = {
    users: Array<userMessageType>
    messages: Array<messagesMessageType>
    currentUser: CurrentUserType
    isRedirectFromAnyPage: boolean
}

export type CurrentUserType = {
    id: string | null,
    content : string | null,
    login: string | null,
    avatar: string | null,
    created_at: string | null,
}

type userMessageType = {
    id: string
    content: string
    login: string
    created_at:string
    avatar:string
}

export type messagesMessageType = {
    id: string
    content: string
    login: string
    created_at: string
    user_from_id: string | null
}

export type stateFriendsType = {
    friends: ObjFriendsType
}

type ObjFriendsType = {
    friends: Array<FriendsType>
}
export type FriendsType = {
    id:string,
    login:string,
    avatar: string,
    friend:boolean,
}

export type stateUsersType = {
    users: ObjUsersType
}

export type ObjUsersType = {
    users: Array<UsersType>,
    userId: string,
    pageSize: number,
    pageNumber:number,
    totalUsers: number,
    totalPages: number,
}

export type UsersType = {
    id: string,
    login: string,
    avatar:string,
    friend: boolean,
}

