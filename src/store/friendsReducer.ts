import {
    ActionsType,
    AsyncDelFriendActionType,
    AsyncGetFriendsActionType,
    DeleteFriend,
    DelFriendActionType,
    GetFriendsActionType
} from "../types/reducersType"

export const GET_FRIENDS = 'GET_FRIENDS'
export const ASYNC_GET_FRIENDS = 'ASYNC_GET_FRIENDS'

export const DEL_FRIEND = 'DEL_FRIEND'
export const ASYNC_DEL_FRIEND = 'ASYNC_DEL_FRIEND'



const defaultState = {
    friends: [] as Array<friend>
}
interface friend {
    id: string;
    login: string;
    friend: boolean;
}


export const friendsReducer = (state = defaultState, action:ActionsType) => {
       switch (action.type) {
           case GET_FRIENDS:
               return {...state, friends: action.payload};
           case DEL_FRIEND:
               return {...state, friends: state.friends.filter(f => (f.id !== action.payload)) }
       default:
           return state;
    }
};




export const getFriendsAction = (payload:string):GetFriendsActionType => ({type: GET_FRIENDS, payload})
export const AsyncGetFriendsAction= (payload:string):AsyncGetFriendsActionType => ({type: ASYNC_GET_FRIENDS, payload})

export const delFriendAction = (payload:string):DelFriendActionType => ({type: DEL_FRIEND, payload})
export const AsyncDelFriendAction = (payload:DeleteFriend):AsyncDelFriendActionType => ({type: ASYNC_DEL_FRIEND, payload})



