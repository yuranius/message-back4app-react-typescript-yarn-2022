import {CurrentUserType, FriendsType, messagesMessageType, ObjUsersType} from "./stateTypes";
import React from "react";


//--------------= Message =---------- //
export type MessagesPageProps = {
    messages: Array<messagesMessageType>,
    currentUser: CurrentUserType,
    users: Array<Users>
    userHandler: (user: Users) => void,
    userId: string,
    value: string,
    messageHandler: (event: React.ChangeEvent<HTMLInputElement> & React.KeyboardEvent<HTMLInputElement>) => void,
    addMassage: () => void,
    loading: boolean,
    show: boolean,
    setShow: (show: boolean) => void
    divRef: () => void
}

type Users = {
    id: string | null,
    login: string | null,
    avatar: string | null,
    content:string | null,
    created_at: string | null,
}

export type MessagePageProps = {
    message: { content: string, created_at: string, id: string },
}


export type UserListMessagesPropsTypes = {
    users: Array<UsersWhoHaveMassagesTypes>,
    currentUser: CurrentUserType,
    userHandler: (user: UsersWhoHaveMassagesTypes) => void
}

export type UsersWhoHaveMassagesTypes = {
    id: string | null,
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
    userId: string,
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
    deleteFriend: (friendId: string) => void,
    loading: boolean,
    defaultAvatar: string,
    userId: string,
    sendMessage: ({}: sendMessageType) => void
}

interface sendMessageType {
    id: string,
    login: string,
    avatar: string,
}


//--------------= Users =---------- //


export interface UsersPropsTypes extends ObjUsersType {
    addFriend: (friendId: string) => void,
    deleteFriend: (friendId: string) => void,
    defaultAvatar: string
    searchChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
    searchUser: string,
    variant: string,
    show: boolean,
    message: string,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    loading: boolean,
    onPageChanged: (page: number) => void
    sendMessage: ({}:sendMessageType) => void
}

export type FoundUsersItemTypes = {
    id: string
    key: string
    login: string
    addFriend: (friendId: string) => void,
    deleteFriend: (friendId: string) => void,
    userId: string
    friend: boolean
    avatar: string
    defaultAvatar: string
    sendMessage: ({}:sendMessageType) => void
    loading:boolean
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
    input:string
}