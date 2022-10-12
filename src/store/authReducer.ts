import {
    AsyncSetAuthUserActionType,
    AsyncSetRegisterUserActionType,
    AuthReducerActionsType,
    AuthUser, LogoutUser, LogoutUserType,
    SetAuthUserActionType
} from "../types/reducersType";

export const  ASYNC_AUTH_USER = 'ASYNC_AUTH_USER'
export const AUTH_USER = 'AUTH_USER'
export const  ASYNC_REGISTER_USER = 'ASYNC_REGISTER_USER'
// const REGISTER_USER = 'REGISTER_USER'
export const  ASYNC_LOGOUT_USER = 'ASYNC_LOGOUT_USER'
export const LOGOUT_USER = 'LOGOUT_USER'


const defaultState = {
    token: null,
    userId: null,
    avatar: null,
    userLogin: '',
};




export const authReducer = (state = defaultState, action: AuthReducerActionsType) => {
       switch (action.type) {
           case AUTH_USER:
               return {...state, ...action.payload};
           case LOGOUT_USER:
               return {...state, ...action.payload};
        default:
            return state;
    }
};



export const setAuthUser = (payload: Object):SetAuthUserActionType => ({type: AUTH_USER, payload})
export const AsyncSetAuthUserAction = (payload: AuthUser):AsyncSetAuthUserActionType => ({type: ASYNC_AUTH_USER, payload})
export const AsyncSetRegisterUserAction = (payload:AuthUser):AsyncSetRegisterUserActionType => ({type: ASYNC_REGISTER_USER, payload})


export const logoutUser = (payload:LogoutUser):LogoutUserType => ({type: LOGOUT_USER, payload})
export const AsyncLogoutUserAction = () => ({type: ASYNC_LOGOUT_USER})

