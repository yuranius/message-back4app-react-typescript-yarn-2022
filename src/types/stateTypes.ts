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
    userId: number
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
    id: number | null,
    content : string | null,
    login: string | null,
    avatar: string | null,
    created_at: string | null,
}

type userMessageType = {
    id: number
    content: string
    login: string
    created_at:string
    avatar:string
}

export type messagesMessageType = {
    id: number
    content: string
    login: string
    created_at: string
    user_from_id:number | null
}

export type stateFriendsType = {
    friends: ObjFriendsType
}

type ObjFriendsType = {
    friends: Array<FriendsType>
}
export type FriendsType = {
    id:number,
    login:string,
    avatar: string,
    friend:boolean,
}

export type stateUsersType = {
    users: ObjUsersType
}

export type ObjUsersType = {
    users: Array<UsersType>,
    userId: number,
    pageSize: number,
    pageNumber:number,
    totalUsers: number,
    totalPages: number,
}

export type UsersType = {
    id: number,
    login: string,
    avatar:string,
    friend: boolean,
}

