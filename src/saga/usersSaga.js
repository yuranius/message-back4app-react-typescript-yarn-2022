import {put, takeEvery} from 'redux-saga/effects'
import {friendsAPI, usersAPI} from "../api/api";
import {
	addFriend,
	ASYNC_ADD_FRIEND,
	ASYNC_DELETE_FRIEND,
	ASYNC_FIND_USERS,
	ASYNC_GET_ALL_USERS,
	deleteFriend,
	findUsers
} from "../store/usersReducer";
import {setLoadingProcessAction, setShowMessageAction} from "../store/overReducer";

const delay = (ms) => new Promise(res => setTimeout(res, ms))

function* findUsersWorker({payload}) {
	try {
		const {pageNumber} = payload
		yield put(setLoadingProcessAction(true))
		const {users, totalPages, totalUsers, message} = yield usersAPI.findUsers(payload)
		yield put(findUsers({users, totalUsers, totalPages, pageNumber}))
		yield put(setLoadingProcessAction(false))
		if (users.length) {
			yield put(setShowMessageAction({statusMessage: 0, message: message}))
		} else {
			yield put(setShowMessageAction({statusMessage: 2, message: message}))
		}
	} catch (error) {
		yield put(setLoadingProcessAction(false))
		yield put(setShowMessageAction({statusMessage: 2, message: error.response.data.message}))
	}
}

function* getAllUsersWorker() {
	try {
		// const {pageNumber} = payload
		//yield put(setLoadingProcessAction(true))

		//const { users, totalPages, totalUsers } = yield usersAPI.findAllUsers(payload)
		const test = yield usersAPI.findAllUsers()

		//yield put(getAllUsers({users, totalUsers, totalPages, pageNumber }))

		console.log('📌:', test, '🌴 🏁')

		//yield put(setLoadingProcessAction(false))

	} catch (e) {
		yield put (setLoadingProcessAction(false))
		yield put(setShowMessageAction({statusMessage:2, message:'Что-то пошло не так... Попробуйте позже...'}))
	}
}

function* addFriendWorker({payload}) {
	try {
		yield put(setLoadingProcessAction(true))
		const response = yield friendsAPI.addFriend(payload)
		yield put(addFriend(payload))
		yield put(setLoadingProcessAction(false))
		yield put(setShowMessageAction(response.message))
	} catch (error) {
		yield put(setLoadingProcessAction(false))
		yield put(setShowMessageAction(error.response.data.message))
	}
}

function* deleteFriendWorker({payload}) {
	try {
		yield put(setLoadingProcessAction(true))
		const response = yield friendsAPI.deleteFriend(payload)
		yield put(deleteFriend(payload))
		yield put(setLoadingProcessAction(false))
		yield put(setShowMessageAction(response.massage))
	} catch (error) {
		yield put(setShowMessageAction(error.response.data.massage))
	}
}

export function* collocutorsWatcher() {
	yield takeEvery(ASYNC_FIND_USERS, findUsersWorker)
	yield takeEvery(ASYNC_GET_ALL_USERS, getAllUsersWorker)
	yield takeEvery(ASYNC_ADD_FRIEND, addFriendWorker)
	yield takeEvery(ASYNC_DELETE_FRIEND, deleteFriendWorker)
}