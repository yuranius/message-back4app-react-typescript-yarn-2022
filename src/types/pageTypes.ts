import {CurrentUserType, FriendsType, messagesMessageType, ObjUsersType} from "./stateTypes";
import React from "react";


//--------------= Message =---------- //
export type MessagesPageProps = {
    messages: Array<messagesMessageType>,
    currentUser: CurrentUserType,
    users: Array<Users>
    userHandler: (user: Users) => void,
    userId: number,
    value: string,
    messageHandler: (event: React.ChangeEvent<HTMLInputElement> & React.KeyboardEvent<HTMLInputElement>) => void,
    addMassage: () => void,
    loading: boolean,
    show: boolean,
    setShow: (show: boolean) => void
    divRef: () => void
}

type Users = {
    id: number | null,
    login: string | null,
    avatar: string | null,
    content:string | null,
    created_at: string | null,
}

export type MessagePageProps = {
    message: { content: string, created_at: string, id: number },
}


export type UserListMessagesPropsTypes = {
    users: Array<UsersWhoHaveMassagesTypes>,
    currentUser: CurrentUserType,
    userHandler: (user: UsersWhoHaveMassagesTypes) => void
}

export type UsersWhoHaveMassagesTypes = {
    id: number | null,
    login: string | null,
    avatar: string | null,
    content:string | null,
    created_at: string | null,
}

export type TitleBlockMessagesPropsTypes = {
    currentUser: CurrentUserType
    setShow: (show: boolean) => void
}


export type FooterBlockMessagesPropsType = {
    value: string,
    messageHandler: (event: React.ChangeEvent<HTMLInputElement> & React.KeyboardEvent<HTMLInputElement>) => void,
    addMassage: () => void
}

export interface BlockMessagesPropsType extends TitleBlockMessagesPropsTypes,
    FooterBlockMessagesPropsType {
    messages: Array<messagesMessageType>,
    userId: number,
    divRef: any,
    loading: boolean,
}

//--------------= Navbar =---------- //
export interface ILink {
    id: number;
    to: string;
    title: string;
}

//--------------= Pagination =---------- //

export type PaginatorPropsTypes = {
    totalItemsCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (p: number) => void,
    portionSize?: number,
}

//--------------= Friends =---------- //

export type FriendsPropsTypes = {
    friends: Array<FriendsType>,
    deleteFriend: (friendId: number) => void,
    loading: boolean,
    defaultAvatar: string,
    userId: number,
    sendMessage: ({}: sendMessageType) => void
}

interface sendMessageType {
    id: number,
    login: string,
    avatar: string,
}


//--------------= Users =---------- //


export interface UsersPropsTypes extends ObjUsersType {
    addFriend: (friendId: number) => void,
    deleteFriend: (friendId: number) => void,
    defaultAvatar: string
    searchChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
    searchUser: string,
    variant: string,
    show: boolean,
    message: string,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    loading: boolean,
    onPageChanged: (page: number) => void
    sendMessage: ({}:FoundUsersItemTypes) => void
}

export type FoundUsersItemTypes = {
    id: number
    key: number
    login: string
    addFriend: (friendId: number) => void,
    deleteFriend: (friendId: number) => void,
    userId: number
    friend: boolean
    avatar: string
    defaultAvatar: string
    sendMessage: ({}:FoundUsersItemTypes) => void
}

//--------------= Profile =---------- //

export type ProfilePropsTypes = {
    inputHandler: (event: any) => void,
    userLogin: string,
    message: string,
    variant: string,
    show: boolean,
    showAlertInputText: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    loading: boolean,
    saveHandler: (event: any) => void,
    changeInputFileHandler: (event:any) => void,
    inputFileValue: string,
    preview: string,
    showAlertInputFile: boolean,
    saveAvatarHandler: (event: any) => void,
    //login:string
}