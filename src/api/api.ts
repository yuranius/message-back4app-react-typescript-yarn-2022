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







type GetMessages = {
	userId: number
	friendsId: number
}




// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = 'vQk4D7V3gIHGhA0cjAx0v2gmzndEVeBMv4b3Zojs';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'gMOqgiPRrv16Lqg5Ps2lYuEMdore14YAyhU1Byu0';
const MASTER_KEY = 'Jn7UyPFUjbcfuztVieO4uRNX5jgglV3UiT3lgAr0';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY, MASTER_KEY);
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
	},

	changeLogin(updateLogin:string) {
		Parse.User.current().set('username', updateLogin).save()
	},

	changeAvatar(updateAvatar:{}) {
		return Parse.User.current().set('avatar', new Parse.File('ava', updateAvatar )).save()
	},
}

export const usersAPI = {
	findAllUsers(pageSize:number, pageStartNumber:number) {
			return new Parse.Query('User').limit(pageSize).skip(pageStartNumber).find()
	},

	findUsers(pageSize:number, pageStartNumber:number, value:string) {
		return new Parse.Query('User').matches('username', value , 'i').limit(pageSize).skip(pageStartNumber).find()
	},

	getUser() {
		return Parse.User.current()
	},

	findFriendsOne(user:{}) {
		return new Parse.Query('Friends').equalTo('FriendOne', user).find()
	},

	findFriendsTwo(user:{}) {
		return new Parse.Query('Friends').equalTo('FriendTwo', user).find();
	},

	getAllUsers() {
		return new Parse.Query('User').find()
	},
	getAllFindUsers(value: string) {
		return new Parse.Query('User').matches('username', value , 'i').find()
	},
}

export type AddFriend = {
	user: {},
	friend: {},
}

export type FindFriend = {
	user: {},
	friend: {},
	firstField: string,
	secondField:string
}

export type FindMessage = FindFriend

export const friendsAPI = {
	addFriend(payload: AddFriend) {
		return new Parse.Object('Friends').set('FriendOne', payload.user).set('FriendTwo', payload.friend).set('Status', false).save();
	},

	getFriend(friendId: string | null) {
		return new Parse.Query('User').equalTo('objectId', friendId).first();
	},

	findDataAboutFriends ({user, friend, firstField, secondField}:FindFriend) {
		return new Parse.Query('Friends').equalTo(firstField, user).equalTo(secondField, friend).find();
	},

	deleteFriend(payload: undefined | string) {
		return new Parse.Object('Friends').set('objectId', payload).destroy();
	},
}

export const messagesAPI = {
	async getUsersWhoHaveMessages(field: string, user:{} ) {
		return new Parse.Query('Message').equalTo(field, user).include(field).find()
	},

	getMessages({user, friend, firstField, secondField}: FindMessage) {
		return new Parse.Query('Message').equalTo(firstField, user).equalTo(secondField, friend).find()
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

