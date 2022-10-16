export const  ASYNC_GET_ALL_USERS = 'ASYNC_GET_ALL_USERS'
const GET_ALL_USERS = 'GET_ALL_USERS'

export const ASYNC_ADD_FRIEND = 'ASYNC_ADD_FRIEND'
const ADD_FRIEND = 'ADD_FRIEND'

export const ASYNC_DELETE_FRIEND = 'ASYNC_DELETE_FRIEND'
const DELETE_FRIEND = 'DELETE_FRIEND'



const defaultState = {
    users: [],
    userId: null,
    pageNumber: 1,
    pageSize: 10,
    totalUsers: 0,
    totalPages: 0,
};

export const usersReducer = (state = defaultState, action) => {
       switch (action.type) {
           case GET_ALL_USERS:
               return {...state, ...action.payload};
           case ADD_FRIEND:
               return {...state,
                   users: state.users.map( c => {
                       if (c.id === action.payload.friendId) {
                           return {...c, friend: true}
                       }
                       return c;
                   })
               }
           case DELETE_FRIEND:
               return {...state,
                   users: state.users.map( c => {
                       if (c.id === action.payload.friendId) {
                           return {...c, friend: false}
                       }
                       return c;
                   })}
        default:
            return state;
    }
};


export const getAllUsers = (payload) => ({type: GET_ALL_USERS, payload})
export const AsyncGetAllUsersAction = (payload) => ({type: ASYNC_GET_ALL_USERS, payload})

export const addFriend = (payload) => ({type:ADD_FRIEND, payload})
export const AsyncAddFriendAction = (payload) => ({type: ASYNC_ADD_FRIEND,payload})

export const deleteFriend = (payload) => ({type:DELETE_FRIEND, payload})
export const AsyncDeleteFriendAction = (payload) => ({type: ASYNC_DELETE_FRIEND,payload})

