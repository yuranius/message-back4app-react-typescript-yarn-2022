import {put, takeEvery} from 'redux-saga/effects'

import {
	ASYNC_AUTH_USER,
	ASYNC_LOGOUT_USER_ACTION,
	ASYNC_REGISTER_USER,
	ASYNC_SET_CHECK_LOGIN_USER_ACTION,
	logoutUser,
	setAuthUser
} from "../store/authReducer"
import {loginAPI} from "../api/api";
import {setLoadingProcessAction, setShowMessageAction} from "../store/overReducer";
import {AsyncSetAuthUserActionType, AsyncSetRegisterUserActionType} from "../types/reducersType";


interface IUser {
	get: (name: string) => void
}


function* setAuthUserWorker({payload}: AsyncSetAuthUserActionType) {
	try {
		yield put(setLoadingProcessAction(true))
		const User: IUser = yield loginAPI.login(payload.email, payload.password)
		const userObject = JSON.parse(JSON.stringify(User))
		// @ts-ignore
		const avatar = yield loginAPI.getAvatar(userObject.objectId)
		const user = {
			token: userObject.sessionToken,
			userId: userObject.objectId,
			userLogin: userObject.username,
			avatar: avatar.get('avatar')._url,
		}
		yield put(setLoadingProcessAction(false))
		yield put(setAuthUser(user))
	} catch (error: any) {
		yield put(setLoadingProcessAction(false))
		if (error.code === 101) {
			yield put(setShowMessageAction({statusMessage: 2, message: 'Неправельный логин или пароль'}))
		} else if (error.code === 205) {
			yield put(setShowMessageAction({statusMessage: 2, message: 'Email пользователья не подвержден'}))
		} else {
			yield put(setShowMessageAction({statusMessage: 2, message: error.message}))
		}
	}

}

function* setRegisterUserWorker({payload}: AsyncSetRegisterUserActionType) {
	try {
		let login = (payload.email.split('@')[0])
		yield put(setLoadingProcessAction(true))
		yield loginAPI.register(payload.email, payload.password, login)
		yield put(setLoadingProcessAction(false))
		yield put(setShowMessageAction({
			statusMessage: 0,
			message: 'Пользователь ' + login + ' зарегстрирован. На Вашу электронную почту отправлено письмо с сылкой для подтверждения email.'
		}))
	} catch (error: any) {
		yield put(setLoadingProcessAction(false))
		if (error.code === 203 || error.code === 202) {
			yield put(setShowMessageAction({statusMessage: 2, message: 'Такой пользователь уже зарегестрирован в системе'}))
		} else {
			yield put(setShowMessageAction({statusMessage: 2, message: error.message}))
		}
	}
}

interface IAvatar {
	get: (name: string) => urlFn
}

type urlFn = {
	url: () => string
}

function* checkLoginUserWorker() {
	try {
		yield put(setLoadingProcessAction(true))
		const User: IUser = yield loginAPI.loginCheck()
		const userObject = JSON.parse(JSON.stringify(User))
		const avatar:IAvatar = yield loginAPI.getAvatar(userObject.objectId)
		yield put(setLoadingProcessAction(false))
		const user = {
			token: userObject.sessionToken,
			userId: userObject.objectId,
			userLogin: userObject.username,
			avatar: avatar.get('avatar').url(),
		}
		yield put(setAuthUser(user))
	} catch (error: any) {
		yield put(setLoadingProcessAction(false))
		console.log('📌:', error.message, '🌴 🏁')
	}
}

function* logoutUserWorker() {
	yield loginAPI.logout()
	yield put(logoutUser({userId: null, token: null}))
}

export function* userWatcher() {
	yield takeEvery(ASYNC_AUTH_USER, setAuthUserWorker)
	yield takeEvery(ASYNC_REGISTER_USER, setRegisterUserWorker)
	yield takeEvery(ASYNC_LOGOUT_USER_ACTION, logoutUserWorker)
	yield takeEvery(ASYNC_SET_CHECK_LOGIN_USER_ACTION, checkLoginUserWorker)

}