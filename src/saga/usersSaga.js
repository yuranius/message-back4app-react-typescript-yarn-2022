import {put, takeEvery} from 'redux-saga/effects'
import {friendsAPI, usersAPI} from "../api/api";
import {
	addFriend,
	ASYNC_ADD_FRIEND,
	ASYNC_DELETE_FRIEND,
	ASYNC_FIND_USERS,
	ASYNC_GET_ALL_USERS,
	deleteFriend,
	getAllUsers
} from "../store/usersReducer";
import {setLoadingProcessAction, setShowMessageAction} from "../store/overReducer";
import {addQueryResultFromApiToArray} from "../Utilits/addQueryResultFromApiToArray";
import {creatArrayUsersWithStatusFriend} from "../Utilits/creatArrayUsersWithStatusFriend";
import {getIdAsQueryResultFromApi} from "../Utilits/getIdAsQueryResultFromApi";


function* getAllUsersWorker({payload}) {
	try {
		yield put(setLoadingProcessAction(true))
		const pageStartNumber = (payload.pageNumber * payload.pageSize - payload.pageSize)
		//объект пользователя
		const user = yield usersAPI.getUser()
		// массив объектов друзей пользователя
		const friendsOne = yield usersAPI.findFriendsOne(user)
		const friendsTwo = yield usersAPI.findFriendsTwo(user)
		// массив id друзей пользователя
		const arrayIdFriends = addQueryResultFromApiToArray(friendsOne, friendsTwo, 'FriendTwo', 'FriendOne')

		if (payload.value) {
			const onePageUsers = yield usersAPI.findUsers(payload.pageSize, pageStartNumber, payload.value)
			const allUsersWithStatusFriends = creatArrayUsersWithStatusFriend(onePageUsers, arrayIdFriends)
			const allFindUsers = yield usersAPI.getAllFindUsers(payload.value)
			let pagesCount = Math.ceil(allFindUsers.length / payload.pageSize);
			yield put(getAllUsers({
				users: allUsersWithStatusFriends,
				totalUsers: allFindUsers.length,
				totalPages: pagesCount,
				pageNumber: payload.pageNumber
			}))
		} else {
			const onePageUsers = yield usersAPI.findAllUsers(payload.pageSize, pageStartNumber)
			const allUsersWithStatusFriends = creatArrayUsersWithStatusFriend(onePageUsers, arrayIdFriends)
			const allUsers = yield usersAPI.getAllUsers()
			let pagesCount = Math.ceil(allUsers.length / payload.pageSize);
			yield put(getAllUsers({
				users: allUsersWithStatusFriends,
				totalUsers: allUsers.length,
				totalPages: pagesCount,
				pageNumber: payload.pageNumber
			}))
		}
		yield put(setLoadingProcessAction(false))
	} catch (error) {
		yield put(setLoadingProcessAction(false))
		yield put(setShowMessageAction({statusMessage: 2, message: 'Что-то пошло не так... Попробуйте позже...'}))
	}
}

function* addFriendWorker({payload}) {
	try {
		yield put(setLoadingProcessAction(true))
		const user = yield usersAPI.getUser()
		const friend = yield  friendsAPI.getFriend(payload.friendId)
		yield friendsAPI.addFriend({user, friend})
		yield put(addFriend(payload))
		yield put(setLoadingProcessAction(false))
		yield put(setShowMessageAction({
			statusMessage: 0,
			message: 'Пользователь ' + user.get('username') + ' добавлен в друзья'
		}))
	} catch (error) {
		yield put(setLoadingProcessAction(false))
		yield put(setShowMessageAction({statusMessage: 2, message: 'Что-то пошло не так... Попробуйте позже...'}))
	}
}

function* deleteFriendWorker({payload}) {
	try {
		yield put(setLoadingProcessAction(true))
		const user = yield usersAPI.getUser()
		const friend = yield  friendsAPI.getFriend(payload.friendId)
		const findFriendOneField = yield friendsAPI.findDataAboutFriends({
			user, friend, firstField: 'FriendOne', secondField: 'FriendTwo'
		})
		const findFriendTwoField = yield friendsAPI.findDataAboutFriends({
			user, friend, firstField: 'FriendTwo', secondField: 'FriendOne'
		})
		const idObjectFriends = getIdAsQueryResultFromApi(findFriendOneField, findFriendTwoField)
		yield friendsAPI.deleteFriend(idObjectFriends)
		yield put(deleteFriend(payload))
		yield put(setLoadingProcessAction(false))
		yield put(setShowMessageAction({
			statusMessage: 0,
			message: 'Пользователь ' + friend.get('username') + ' удален из Ваших друзей'
		}))
	} catch (error) {
		yield put(setLoadingProcessAction(false))
		yield put(setShowMessageAction({statusMessage: 2, message: 'Что-то пошло не так...Попробуйте еще раз'}))
	}
}

export function* collocutorsWatcher() {
	yield takeEvery(ASYNC_GET_ALL_USERS, getAllUsersWorker)
	yield takeEvery(ASYNC_ADD_FRIEND, addFriendWorker)
	yield takeEvery(ASYNC_DELETE_FRIEND, deleteFriendWorker)
}