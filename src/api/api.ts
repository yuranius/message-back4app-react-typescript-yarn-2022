import axios from "axios";
import {GetMessagesUsers, MessageType} from "../types/reducersType";



const instance = axios.create({
    headers: {
        'Content-Type':'application/json',
    },
});



export const loginAPI = {
    register(email:string, password:string) {
        return instance.post('/api/auth/register', {email, password}).then((response) => {
            return response.data
        })
    },
    login(email:string, password:string) {
        return instance.post(`/api/auth/login`, { email, password}).then((response) => {
            return response.data;
        });
    }
}

export const profileAPI = {
    changeLogin( userId:number, userLogin:string ) {
        return instance.post(`/api/profile/login`, { userId, userLogin }).then((response) => {
            return response.data;
        });
    },
    changeAvatar(formData:any) {
        return axios.post('api/profile/avatar', formData).then((response) => {
            return response.data
        })
    }
}

type FindUsers = {
    userId:number,
    pageNumber:number,
    pageSize:number,
    value?:string,
}


export const usersAPI = {
    findAllUsers( payload:FindUsers ) {
        return instance.get(`/api/find/users/?userId=${payload.userId}&page=${payload.pageNumber}&limit=${payload.pageSize}`, {}).then((response) => {
            return response.data;
        });
    },
    findUsers( payload:FindUsers ) {
        return instance.get(`/api/find/users/?userId=${payload.userId}&value=${payload.value}&page=${payload.pageNumber}&limit=${payload.pageSize}`, {}).then((response) => {
            return response.data;
        });
    },
}


export type AddFriend = {
    userId:number,
    friendId:number,
    test: string
}

export const friendsAPI = {
    addFriend( payload:AddFriend ) {
        return instance.post(`/api/friend/add`, { payload}).then((response) => {
            return response.data;
        });
    },
    deleteFriend( payload:{} ) {
        return instance.post(`/api/friend/delete`, {payload}).then((response) => {
            return response.data;
        });
    },
    getFriends( payload:number ) {
        return instance.get( `api/find/friends/?userId=${payload}`, {}).then((response) => {
            return response.data
        })
    }
}

type GetMessages = {
    userId:number
    friendsId:number
}

export const messagesAPI = {
    getUsersWhoHaveMessages( payload:number ) {
        return instance.get(`/api/messages/collocuters/?userId=${payload}`, {}).then((response) => {
            return response.data;
        });
    },
    getMessages({userId, friendsId}:GetMessagesUsers){
        return instance.get(`/api/messages/?userId=${userId}&friendsId=${friendsId}`, {}).then((response) => {
            return response.data;
        });
    },
    addMessage( payload: MessageType) {
        return instance.post(`/api/messages/add`, {payload}).then((response) => {
            return response.data;
        });
    },






    //!TODO не реализовано
    changeMassage( payload:any ) {
        return instance.post(`/api/messages/${payload}`, {}).then((response) => {
            return response.data;
        });
    },
    //!TODO не реализовано
    deleteMassage( payload:any ) {
        return instance.post(`/api/massages/delete`, {}).then((response) => {
            return response.data;
        });
    },
}























