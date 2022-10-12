import {put, takeEvery} from 'redux-saga/effects'
import {messagesAPI} from "../api/api";
import {
    ASYNC_CHANGE_USERS_WHO_HAVE_MESSAGES,
    ASYNC_GET_USERS_WHO_HAVE_MESSAGES,
    changeUsersWhoHaveMessagesAction,
    addMessageActionCreator,
    getMessagesUserAction,
    getUsersWhoHaveMessagesAction, ASYNC_GET_MESSAGES_USER, ASYNC_ADD_MESSAGE, setCurrentUserAction
} from "../store/messageReducer";
import {setLoadingProcessAction, setShowMessageAction} from "../store/overReducer";
import {
    AsyncAddMessageActionCreatorType, AsyncGetMessagesUserActionType, AsyncGetUsersWhoHaveMessagesActionType,
    ChangeUsersWhoHaveMessagesActionType, GetMessagesUserActionType
} from "../types/reducersType";




function* setUsersWhoHaveMessagesWorker({payload}:AsyncGetUsersWhoHaveMessagesActionType) {
    try {
        yield put (setLoadingProcessAction(true))
        const {users} = yield messagesAPI.getUsersWhoHaveMessages(payload)
        yield put (setLoadingProcessAction(false))
        yield put (getUsersWhoHaveMessagesAction(users))
        if (users.length) {
            yield put(setCurrentUserAction(users[0]))
        }
    } catch (error:any) {
        yield put (setLoadingProcessAction(false))
        yield  put(setShowMessageAction({statusMessage:2, message:error.response.data.message}))
    }
}

function* changeUsersWhoHaveMessagesWorker({payload}:ChangeUsersWhoHaveMessagesActionType) {
    try {
        yield put (changeUsersWhoHaveMessagesAction(payload))
    } catch (error:any) {
        yield  put(setShowMessageAction({statusMessage:2, message:error.response.data.message}))
    }
}

function* getMessagesUserWorker({payload}:AsyncGetMessagesUserActionType) {
    try {
        yield put (setLoadingProcessAction(true))
        const {allMessage} = yield messagesAPI.getMessages(payload)
        if (allMessage) {
            yield put (getMessagesUserAction(allMessage))
        } else {
            yield put (getMessagesUserAction([]))
        }
        yield put (setLoadingProcessAction(false))

    } catch (error:any) {
        yield put (setLoadingProcessAction(false))
        yield put (getMessagesUserAction([{user_from_id: null, id: null, created_at: null, login: null, content:null}]))
        yield  put(setShowMessageAction({statusMessage:2, message:error.response.data.message}))

    }
}

function* addMessageWorker({payload}:AsyncAddMessageActionCreatorType) {
    try {
        yield put (setLoadingProcessAction(true))
        const {id, message, userToId, userFromId, created_at} = yield messagesAPI.addMessage(payload)
        yield put (addMessageActionCreator({id, message, userToId, userFromId, created_at}))
        yield put (setLoadingProcessAction(false))
    } catch (error:any) {
        yield put (setLoadingProcessAction(false))
        yield  put(setShowMessageAction({statusMessage:2, message:error.response.data.message}))

    }
}



export function* messagesWatcher() {
    yield takeEvery(ASYNC_GET_USERS_WHO_HAVE_MESSAGES, setUsersWhoHaveMessagesWorker)
    yield takeEvery(ASYNC_GET_MESSAGES_USER, getMessagesUserWorker)
    yield takeEvery(ASYNC_ADD_MESSAGE, addMessageWorker)
    yield takeEvery(ASYNC_CHANGE_USERS_WHO_HAVE_MESSAGES, changeUsersWhoHaveMessagesWorker)

}