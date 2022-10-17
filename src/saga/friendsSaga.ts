import {put,takeEvery} from 'redux-saga/effects'
import {friendsAPI, usersAPI} from "../api/api";
import {
    ASYNC_DEL_FRIEND,
    ASYNC_GET_FRIENDS,
    delFriendAction,
    getFriendsAction
} from "../store/friendsReducer";
import {setLoadingProcessAction, setShowMessageAction} from "../store/overReducer";
import {AsyncDelFriendActionType, AsyncGetFriendsActionType} from "../types/reducersType";
import {addQueryResultFromApiToArray} from "../Utilits/addQueryResultFromApiToArray";
import {creatArrayUsersWithStatusFriend} from "../Utilits/creatArrayUsersWithStatusFriend";
import {deleteFriend, getAllUsers} from "../store/usersReducer";
import {getIdAsQueryResultFromApi} from "../Utilits/getIdAsQueryResultFromApi";


interface IFriends {
    id: string,
    login:string,
    friend:boolean,
}


function* getFriendsWorker({payload}:AsyncGetFriendsActionType) {
    try {
        yield put(setLoadingProcessAction(true))



        yield put(setLoadingProcessAction(true))
        //объект пользователя
        let user:{} = yield usersAPI.getUser()
        // массив объектов друзей пользователя
        const friendsOne:[] = yield usersAPI.findFriendsOne(user)
        const friendsTwo:[] = yield usersAPI.findFriendsTwo(user)


        let allObjectFriends:any = []

        friendsOne.map( (t:any) => allObjectFriends.push(t.get('FriendTwo')))
        friendsTwo.map( (t:any) => allObjectFriends.push(t.get('FriendOne')))

        let allFriends:any = []

        allObjectFriends.map( (fr:any) => allFriends.push({ id: fr.id, avatar: fr.get('avatar').url(), login: fr.get('username'), friend: true}))


        yield put(setLoadingProcessAction(false))
        yield put(getFriendsAction(allFriends))
    } catch (error:any) {
        yield put(setLoadingProcessAction(false))
        yield put(setShowMessageAction({statusMessage:2, message: error.response.data.massage}))
    }
}

function* delFriendWorker({payload}:AsyncDelFriendActionType){
    try {

        yield put(setLoadingProcessAction(true))

        const user:{} = yield usersAPI.getUser()
        const friend:{} = yield  friendsAPI.getFriend(payload.friendId)
        const findFriendOneField:[] = yield friendsAPI.findDataAboutFriends({
            user, friend, firstField: 'FriendOne', secondField: 'FriendTwo'
        })
        const findFriendTwoField:[] = yield friendsAPI.findDataAboutFriends({
            user, friend, firstField: 'FriendTwo', secondField: 'FriendOne'
        })
        const idObjectFriends:undefined | string = getIdAsQueryResultFromApi(findFriendOneField, findFriendTwoField)

        console.log( '📌:',idObjectFriends,'🌴 🏁')

        yield friendsAPI.deleteFriend(idObjectFriends)
        yield put(deleteFriend(payload))
        //const {friendId, message} = yield friendsAPI.deleteFriend(payload)
        yield put(setLoadingProcessAction(false))
        //yield put (delFriendAction(friendId))
        //yield put (setShowMessageAction({statusMessage: 0, message}))
    } catch (error:any) {
        yield put(setLoadingProcessAction(false))
        yield put(setShowMessageAction({statusMessage:2, message: error.response.data.massage}))
    }
}



export function* friendsWatcher() {
    yield takeEvery(ASYNC_GET_FRIENDS, getFriendsWorker)
    yield takeEvery(ASYNC_DEL_FRIEND, delFriendWorker)
}