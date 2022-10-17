import {put, takeEvery} from 'redux-saga/effects'
import {loginAPI, messagesAPI} from "../api/api";
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
    ChangeUsersWhoHaveMessagesActionType, GetMessagesUserActionType, MyUsersType
} from "../types/reducersType";
import {mapAndPuhMessagesFromApi} from "../Utilits/mapAndPushMessagesFromApi";


interface IUser {
    get: (field: string) => string
    id: string
}




function* setUsersWhoHaveMessagesWorker() {
    try {
        yield put (setLoadingProcessAction(true))
        const user: IUser = yield loginAPI.loginCheck()
        const messagesFrom:[] = yield messagesAPI.getUsersWhoHaveMessages('user_from_id', user)
        
        console.log( '📌:',messagesFrom,'🌴 🏁')
        
        
        // const messagesTo:[] = yield messagesAPI.getUsersWhoHaveMessages('user_to_id', user)
        // const allMessage = [...mapAndPuhMessagesFromApi(messagesFrom, 'user_to_id'), ...mapAndPuhMessagesFromApi(messagesTo, 'user_from_id')]
        // yield put (setLoadingProcessAction(false))
        // yield put (getUsersWhoHaveMessagesAction(allMessage.reverse()))
        // if (allMessage.length) {
        //     yield put(setCurrentUserAction(allMessage.reverse()[0]))
        // }
    } catch (error:any) {
        yield put (setLoadingProcessAction(false))
        yield  put(setShowMessageAction({statusMessage:2, message:error.message}))
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


        console.log( '📌:message',payload,'🌴 🏁')

        // const {allMessage} = yield messagesAPI.getMessages(payload)
        // if (allMessage) {
        //     yield put (getMessagesUserAction(allMessage))
        // } else {
        //     yield put (getMessagesUserAction([]))
        // }
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