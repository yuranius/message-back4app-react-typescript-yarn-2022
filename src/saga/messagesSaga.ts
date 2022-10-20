import {put, takeEvery} from 'redux-saga/effects'
import {friendsAPI, loginAPI, messagesAPI} from "../api/api";
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
    AsyncAddMessageActionCreatorType, AsyncGetMessagesUserActionType,
    ChangeUsersWhoHaveMessagesActionType, MyUsersType
} from "../types/reducersType";
import {mapAndPuhMessagesFromApi, mapAndPushUserMessagesFromApi} from "../Utilits/mapAndPushMessagesFromApi";
import {uniqueDataArrayMessages} from "../Utilits/uniqueDataArrayMessages";


interface IUser {
    get: (field: string) => string
    id: string
}

interface IMessage {
    id: string,
    message: string,
    userToId: string,
    userFromId: string,
    created_at:string
}

let user:IUser = {get:field => '', id: ''}


function* getUsersWhoHaveMessagesWorker() {
    try {
        yield put (setLoadingProcessAction(true))
        user = yield loginAPI.loginCheck()
        const messagesFrom:[] = yield messagesAPI.getUsersWhoHaveMessages('user_from_id', user)
        const messagesTo:[] = yield messagesAPI.getUsersWhoHaveMessages('user_to_id', user)
        yield put (setLoadingProcessAction(false))
        // попробовать запрос с OR Parse.Query.or(messagesTo, messagesFrom)
        const allMessage:Array<MyUsersType> = [...mapAndPushUserMessagesFromApi(messagesFrom, 'user_to_id'), ...mapAndPushUserMessagesFromApi(messagesTo, 'user_from_id')].reverse()
        const testArr:Array<MyUsersType> = uniqueDataArrayMessages(allMessage)
        yield put (getUsersWhoHaveMessagesAction(testArr))
        if (allMessage.length) {
            yield put(setCurrentUserAction(testArr[0]))
        }
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
        const friend:IUser = yield friendsAPI.getFriend(payload.friendsId)
        const messagesFrom:[] = yield messagesAPI.getMessages({user, friend, firstField: 'user_from_id', secondField: 'user_to_id'})
        const messagesTo:[] = yield messagesAPI.getMessages({user, friend, firstField: 'user_to_id', secondField: 'user_from_id'})
        const arrayMessage = [...messagesFrom, ...messagesTo]
        const allMessages = mapAndPuhMessagesFromApi(arrayMessage, "user_from_id").sort((a:any, b:any) => a.updatedAt - b.updatedAt)
        if (arrayMessage.length) {
            yield put (getMessagesUserAction(allMessages))
        } else {
            yield put (getMessagesUserAction([]))
        }
        yield put (setLoadingProcessAction(false))
    } catch (error:any) {
        yield put (setLoadingProcessAction(false))
        yield put (getMessagesUserAction([{user_from_id: null, id: null, created_at: null, login: null, content:null}]))
        yield  put(setShowMessageAction({statusMessage:2, message:error.message}))

    }
}

function* addMessageWorker({payload}:AsyncAddMessageActionCreatorType) {
    try {
        const friend:IUser = yield friendsAPI.getFriend(payload.userToId)
        const message: IMessage = yield messagesAPI.addMessage({message: payload.message, created_at: payload.created_at, user, friend })
        yield put (addMessageActionCreator({ id: message.id, message: payload.message, userToId: payload.userToId, userFromId: payload.userFromId, created_at: payload.created_at}))
    } catch (error:any) {
        yield put (setLoadingProcessAction(false))
        yield  put(setShowMessageAction({statusMessage:2, message:error.message}))

    }
}



export function* messagesWatcher() {
    yield takeEvery(ASYNC_GET_USERS_WHO_HAVE_MESSAGES, getUsersWhoHaveMessagesWorker)
    yield takeEvery(ASYNC_GET_MESSAGES_USER, getMessagesUserWorker)
    yield takeEvery(ASYNC_ADD_MESSAGE, addMessageWorker)
    yield takeEvery(ASYNC_CHANGE_USERS_WHO_HAVE_MESSAGES, changeUsersWhoHaveMessagesWorker)

}