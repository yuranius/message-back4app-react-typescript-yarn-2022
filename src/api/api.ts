// @ts-ignore
import Parse from '../../node_modules/parse/dist/parse';


import {GetMessagesUsers, MessageType} from '../types/reducersType';


// @ts-ignore
const instance = {
    headers: {
        'Content-Type': 'application/json',
    },
};


// export const loginAPI = {
//     register(email:string, password:string) {
//         // return instance.post('/api/auth/register', {email, password}).then((response) => {
//         //     return response.data
//         // })
//     },
//     login(email:string, password:string) {
//         // return instance.post(`/api/auth/login`, { email, password}).then((response) => {
//         //     return response.data;
//         // });
//     }
// }

export const profileAPI = {
    changeLogin(userId: number, userLogin: string) {
        // return instance.post(`/api/profile/login`, { userId, userLogin }).then((response) => {
        //     return response.data;
        // });
    },
    changeAvatar(formData: any) {

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
        // return instance.get(`/api/find/users/?userId=${payload.userId}&page=${payload.pageNumber}&limit=${payload.pageSize}`, {}).then((response) => {
        //     return response.data;
        // });
    },
    findUsers( payload:FindUsers ) {
        // return instance.get(`/api/find/users/?userId=${payload.userId}&value=${payload.value}&page=${payload.pageNumber}&limit=${payload.pageSize}`, {}).then((response) => {
        //     return response.data;
        // });
    },
}


export type AddFriend = {
    userId:number,
    friendId:number,
    test: string
}

export const friendsAPI = {
    addFriend( payload:AddFriend ) {
        // return instance.post(`/api/friend/add`, { payload}).then((response) => {
        //     return response.data;
        // });
    },
    deleteFriend( payload:{} ) {
        // return instance.post(`/api/friend/delete`, {payload}).then((response) => {
        //     return response.data;
        // });
    },
    getFriends( payload:number ) {
        // return instance.get( `api/find/friends/?userId=${payload}`, {}).then((response) => {
        //     return response.data
        // })
    }
}

type GetMessages = {
    userId:number
    friendsId:number
}

export const messagesAPI = {
    getUsersWhoHaveMessages(payload: number) {
        // return instance.get(`/api/messages/collocuters/?userId=${payload}`, {}).then((response) => {
        //     return response.data;
        // });
    },
    getMessages({userId, friendsId}: GetMessagesUsers) {
        // return instance.get(`/api/messages/?userId=${userId}&friendsId=${friendsId}`, {}).then((response) => {
        //     return response.data;
        // });
    },
    addMessage(payload: MessageType) {
        // return instance.post(`/api/messages/add`, {payload}).then((response) => {
        //     return response.data;
        // });
    },






    //!TODO не реализовано
    changeMassage( payload:any ) {
        // return instance.post(`/api/messages/${payload}`, {}).then((response) => {
        //     return response.data;
        // });
    },
    //!TODO не реализовано
    deleteMassage(payload: any) {
        // return instance.post(`/api/massages/delete`, {}).then((response) => {
        //     return response.data;
        // });
    },
}


// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = 'vQk4D7V3gIHGhA0cjAx0v2gmzndEVeBMv4b3Zojs';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'gMOqgiPRrv16Lqg5Ps2lYuEMdore14YAyhU1Byu0';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

type User = {
    get: () => void
}

export const loginAPI = {
    async register(email: string, password: string) {

        let user = new Parse.User();
        user.set("username", "my name");
        user.set("password", password);
        user.set("email", email);

        // other fields can be set just like with Parse.Object


        user.signUp().then(function(user:any) {
            console.log('User created successful with name: ' + user.get("username") + ' and email: ' + user.get("email"));
        }).catch(function(error:any){
            console.log("Error: " + error.code + " " + error.message);
        });


    },
    async login(email: string, password: string) {
        try {
            const loggedInUser = await Parse.User.logIn(email, password);
            // logIn returns the corresponding ParseUser object
            alert(
                `Success! User ${loggedInUser.get(
                    'username'
                )} has successfully signed in!`
            );
            return true;
        } catch (error: any) {
            // Error can be caused by wrong parameters or lack of Internet connection
            alert(`Error! ${error.message}`);
            return false;
        }
    }
}
