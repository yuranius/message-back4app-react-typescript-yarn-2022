export const  ASYNC_CHANGE_LOGIN_USER = 'ASYNC_CHANGE_LOGIN_USER'
const CHANGE_LOGIN_USER = 'CHANGE_LOGIN_USER'

export const ASYNC_CHANGE_AVATAR_USER = 'ASYNC_CHANGE_AVATAR_USER'
const CHANGE_AVATAR_USER = 'CHANGE_AVATAR_USER'

const defaultState = {
    userId: null,
    userLogin: '',
    userAvatar:''
};


export const profileReducer = (state = defaultState, action) => {
    switch (action.type) {

        case CHANGE_LOGIN_USER:
            return {...state, ...action.payload};
        case CHANGE_AVATAR_USER:
            return {...state, userAvatar: action.payload}
        default:
            return state;
    }
};


export const changeLoginUser = (payload) => ({type: CHANGE_LOGIN_USER, payload})
export const AsyncChangeLoginUserAction = (payload) => ({type: ASYNC_CHANGE_LOGIN_USER, payload})

export const changeAvatarUser = (payload) => ({type: CHANGE_AVATAR_USER, payload})
export const AsyncChangeAvatarUserAction = (payload) => ({type: ASYNC_CHANGE_AVATAR_USER, payload})