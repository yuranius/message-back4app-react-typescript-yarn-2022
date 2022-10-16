import {
	AsyncChangeAvatarUserActionType,
	AsyncChangeLoginUserActionType,
	AsyncSetAuthUserActionType,
	AsyncSetRegisterUserActionType,
	AuthReducerActionsType,
	AuthUser, ChangeAvatar, changeAvatarUserType, ChangeLogin, changeLoginUserType,
	LogoutUser,
	LogoutUserType,
	SetAuthUserActionType
} from "../types/reducersType";


export const ASYNC_AUTH_USER = 'ASYNC_AUTH_USER'
export const AUTH_USER = 'AUTH_USER'
export const ASYNC_REGISTER_USER = 'ASYNC_REGISTER_USER'
export const ASYNC_SET_CHECK_LOGIN_USER_ACTION = 'ASYNC_SET_CHECK_LOGIN_USER_ACTION'
export const ASYNC_LOGOUT_USER_ACTION = 'ASYNC_LOGOUT_USER_ACTION'
export const LOGOUT_USER = 'LOGOUT_USER'

export const ASYNC_CHANGE_LOGIN_USER = 'ASYNC_CHANGE_LOGIN_USER'
export const CHANGE_LOGIN_USER = 'CHANGE_LOGIN_USER'

export const ASYNC_CHANGE_AVATAR_USER = 'ASYNC_CHANGE_AVATAR_USER'
export const CHANGE_AVATAR_USER = 'CHANGE_AVATAR_USER'


const defaultState = {
	token: null,
	userId: null,
	avatar: null,
	userLogin: '',
};


export const authReducer = (state = defaultState, action: AuthReducerActionsType) => {
	switch (action.type) {
		case AUTH_USER:
			return {...state, ...action.payload};
		case LOGOUT_USER:
			return {...state, ...action.payload};
		case CHANGE_LOGIN_USER:
			return {...state, userLogin: action.payload};
		case CHANGE_AVATAR_USER:
			return {...state, userAvatar: action.payload}
		default:
			return state;
	}
};


export const setAuthUser = (payload: Object): SetAuthUserActionType => ({type: AUTH_USER, payload})
export const AsyncSetAuthUserAction = (payload: AuthUser): AsyncSetAuthUserActionType => ({	type: ASYNC_AUTH_USER,	payload})
export const AsyncSetRegisterUserAction = (payload: AuthUser): AsyncSetRegisterUserActionType => ({	type: ASYNC_REGISTER_USER,	payload})
export const AsyncSetCheckLoginUserAction = () => ({type: ASYNC_SET_CHECK_LOGIN_USER_ACTION})


export const logoutUser = (payload: LogoutUser): LogoutUserType => ({type: LOGOUT_USER, payload})
export const AsyncLogoutUserAction = () => ({type: ASYNC_LOGOUT_USER_ACTION})

export const changeLoginUser = (payload:string):changeLoginUserType => ({type: CHANGE_LOGIN_USER, payload})
export const AsyncChangeLoginUserAction = (payload:ChangeLogin):AsyncChangeLoginUserActionType => ({type: ASYNC_CHANGE_LOGIN_USER, payload})

export const changeAvatarUser = (payload:ChangeAvatar):changeAvatarUserType => ({type: CHANGE_AVATAR_USER, payload})
export const AsyncChangeAvatarUserAction = (payload:ChangeAvatar):AsyncChangeAvatarUserActionType => ({type: ASYNC_CHANGE_AVATAR_USER, payload})

