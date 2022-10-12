import {currentDate} from "../Utilits/getData";
import {CurrentUserType} from "../types/stateTypes";
import {
    AddMessageActionCreatorType,
    AddMessageType,
    AddUsersMessagesType,
    AddUsersWhoHaveMessagesActionType,
    AsyncAddMessageActionCreatorType,
    AsyncChangeUsersWhoHaveMessagesActionType,
    AsyncGetMessagesUserActionType,
    AsyncGetUsersWhoHaveMessagesActionType,
    ChangeUsersWhoHaveMessagesActionType,
    GetMessagesUserActionType,
    GetMessagesUsers,
    GetUsersWhoHaveMessagesActionType,
    IsRedirectFromAnyPageActionType,
    MessageReducerActionsType, MessagesUser,
    MessageType, MyUsersType,
    SetCurrentUserActionType
} from "../types/reducersType";
import {UsersWhoHaveMassagesTypes} from "../types/pageTypes";


let initialState = {
    users: [],
    messages:[],
    currentUser:'',
    isRedirectFromAnyPage: false
}

export const ADD_MESSAGE = 'ADD_MESSAGE'
export const ASYNC_ADD_MESSAGE = 'ASYNC_ADD_MESSAGE'

export const GET_USERS_WHO_HAVE_MESSAGES = 'GET_USERS_WHO_HAVE_MESSAGES'
export const ASYNC_GET_USERS_WHO_HAVE_MESSAGES = 'ASYNC_GET_USERS_WHO_HAVE_MESSAGES'

export const CHANGE_USERS_WHO_HAVE_MESSAGES = 'CHANGE_USERS_WHO_HAVE_MESSAGES'
export const ASYNC_CHANGE_USERS_WHO_HAVE_MESSAGES = 'ASYNC_CHANGE_USERS_WHO_HAVE_MESSAGES'

export const GET_MESSAGES_USER = 'GET_MESSAGES_USER'
export const ASYNC_GET_MESSAGES_USER = 'ASYNC_GET_MESSAGES_USER'

export const SET_CURRENT_USER = 'SET_CURRENT_USER'

export const ADD_USERS_WHO_HAVE_MESSAGES = 'ADD_USERS_WHO_HAVE_MESSAGES'

export const IS_REDIRECT_FROM_ANY_PAGE = 'IS_REDIRECT_FROM_ANY_PAGE'

export const messageReducer = (state = initialState, action:  MessageReducerActionsType) => {
    switch (action.type) {
        case ADD_MESSAGE:{
            let newMessage = {
                id: action.payload.id,
                content: action.payload.message,
                created_at: currentDate,
                user_from_id: action.payload.userFromId
            };
            return {
                ...state,
                messages:[...state.messages, newMessage],
            };
        }

        case ADD_USERS_WHO_HAVE_MESSAGES:
            const newUser = {
                id: action.payload.id,
                content:'',
                login: action.payload.login,
                avatar: action.payload.avatar,
                created_at: currentDate,
            }
            return {
                ...state,
                users: [newUser, ...state.users.filter((user:AddUsersMessagesType) => user.id !== newUser.id)]
            }

        case GET_USERS_WHO_HAVE_MESSAGES:
            return {
                ...state,
                users: action.payload
            }

        case CHANGE_USERS_WHO_HAVE_MESSAGES:
            //TODO решение кривое: первым оставляем в массиве user, который пришел в action, а потом всех остальных
            return {
                ...state,
                users: [...state.users.filter((user:AddUsersMessagesType) => user.id === action.payload), ...state.users.filter((user:AddUsersMessagesType) => user.id !== action.payload)]
            }

        case GET_MESSAGES_USER:
            return {
                ...state,
                messages: action.payload
            }

        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        case IS_REDIRECT_FROM_ANY_PAGE:
            return {
                ...state,
                isRedirectFromAnyPage: action.payload
            }
        default:
            return state;
    }
};




export let addMessageActionCreator = (payload:AddMessageType):AddMessageActionCreatorType => ({type: ADD_MESSAGE, payload});
export const AsyncAddMessageActionCreator = (payload:MessageType):AsyncAddMessageActionCreatorType => ({type: ASYNC_ADD_MESSAGE, payload})

export const addUsersWhoHaveMessagesAction = (payload:AddUsersMessagesType):AddUsersWhoHaveMessagesActionType => ({type: ADD_USERS_WHO_HAVE_MESSAGES, payload})

export const getUsersWhoHaveMessagesAction = (payload:Array<MyUsersType>):GetUsersWhoHaveMessagesActionType => ({type:GET_USERS_WHO_HAVE_MESSAGES, payload});
export const AsyncGetUsersWhoHaveMessagesAction = (payload:number):AsyncGetUsersWhoHaveMessagesActionType => ({type:ASYNC_GET_USERS_WHO_HAVE_MESSAGES, payload});

export const changeUsersWhoHaveMessagesAction = (payload:number | null):ChangeUsersWhoHaveMessagesActionType => ({type:CHANGE_USERS_WHO_HAVE_MESSAGES, payload});
//export const AsyncChangeUsersWhoHaveMessagesAction = (payload: number | null):AsyncChangeUsersWhoHaveMessagesActionType => ({type:ASYNC_CHANGE_USERS_WHO_HAVE_MESSAGES, payload});

export const getMessagesUserAction = (payload: Array<MessagesUser>):GetMessagesUserActionType => ({type:GET_MESSAGES_USER, payload});
export const AsyncGetMessagesUserAction = (payload:GetMessagesUsers):AsyncGetMessagesUserActionType => ({type:ASYNC_GET_MESSAGES_USER, payload});

export const setCurrentUserAction = (payload: UsersWhoHaveMassagesTypes):SetCurrentUserActionType => ({type:SET_CURRENT_USER, payload});

export const isRedirectFromAnyPageAction = (payload:boolean):IsRedirectFromAnyPageActionType => ({type: IS_REDIRECT_FROM_ANY_PAGE, payload})

