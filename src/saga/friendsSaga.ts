import {put,takeEvery} from 'redux-saga/effects'
import {friendsAPI} from "../api/api";
import {
    ASYNC_DEL_FRIEND,
    ASYNC_GET_FRIENDS,
    delFriendAction,
    getFriendsAction
} from "../store/friendsReducer";
import {setLoadingProcessAction, setShowMessageAction} from "../store/overReducer";
import {AsyncDelFriendActionType, AsyncGetFriendsActionType} from "../types/reducersType";



function* getFriendsWorker({payload}:AsyncGetFriendsActionType) {
    try {
        yield put(setLoadingProcessAction(true))
        const {friends} = yield friendsAPI.getFriends(payload)
        yield put(setLoadingProcessAction(false))
        yield put(getFriendsAction(friends))
    } catch (error:any) {
        yield put(setLoadingProcessAction(false))
        yield put(setShowMessageAction({statusMessage:2, message: error.response.data.massage}))
    }
}

function* delFriendWorker({payload}:AsyncDelFriendActionType){
    try {
        yield put(setLoadingProcessAction(true))
        const {friendId, message} = yield friendsAPI.deleteFriend(payload)
        yield put(setLoadingProcessAction(false))
        yield put (delFriendAction(friendId))
        yield put (setShowMessageAction({statusMessage: 0, message}))
    } catch (error:any) {
        yield put(setLoadingProcessAction(false))
        yield put(setShowMessageAction({statusMessage:2, message: error.response.data.massage}))
    }
}



export function* friendsWatcher() {
    yield takeEvery(ASYNC_GET_FRIENDS, getFriendsWorker)
    yield takeEvery(ASYNC_DEL_FRIEND, delFriendWorker)
}