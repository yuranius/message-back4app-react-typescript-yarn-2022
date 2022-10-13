// @ts-ignore
import Parse from '../../node_modules/parse/dist/parse';


import {GetMessagesUsers, MessageType} from '../types/reducersType';



// @ts-ignore
const instance = {
	headers: {
		'Content-Type': 'application/json',
	},
};



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
	userId: number,
	pageNumber: number,
	pageSize: number,
	value?: string,
}





export type AddFriend = {
	userId: number,
	friendId: number,
	test: string
}

export const friendsAPI = {
	addFriend(payload: AddFriend) {
		// return instance.post(`/api/friend/add`, { payload}).then((response) => {
		//     return response.data;
		// });
	},
	deleteFriend(payload: {}) {
		// return instance.post(`/api/friend/delete`, {payload}).then((response) => {
		//     return response.data;
		// });
	},
	getFriends(payload: number) {
		// return instance.get( `api/find/friends/?userId=${payload}`, {}).then((response) => {
		//     return response.data
		// })
	}
}

type GetMessages = {
	userId: number
	friendsId: number
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
	changeMassage(payload: any) {
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


export const loginAPI = {
	register(email: string, password: string, login: string) {
		return new Parse.User().set('username', login).set('password', password).set('email', email).signUp()
	},

	login(email: string, password: string) {
		return Parse.User.logIn(email, password)
	},

	loginCheck() {
		return Parse.User.current()
	},

	getAvatar(id:string) {
		return new Parse.Query('User').select('avatar').equalTo('objectId', id).first()
	},

	logout() {
		return Parse.User.logOut()
	}
}

export const usersAPI = {
	findAllUsers() {
			return new Parse.Query('User').find()
	},


	findUsers(payload: FindUsers) {
		// return instance.get(`/api/find/users/?userId=${payload.userId}&value=${payload.value}&page=${payload.pageNumber}&limit=${payload.pageSize}`, {}).then((response) => {
		//     return response.data;
		// });
	},
}

