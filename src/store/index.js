import { applyMiddleware, combineReducers,  createStore } from "redux";
import { authReducer } from "./authReducer";
import { overReducer } from "./overReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { rootWatcher } from "../saga";
import {usersReducer} from "./usersReducer";
import {friendsReducer} from "./friendsReducer";
import {messageReducer} from "./messageReducer";

const saga = createSagaMiddleware()

const rootReducer = combineReducers({
    user: authReducer,
    users: usersReducer,
    over: overReducer,
    friends: friendsReducer,
    message: messageReducer,
})

const middleWares = [saga, thunk]

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleWares)))

saga.run(rootWatcher)


window.store_info = store.getState(); // напиши в консоли "store_info" и получи текущее состояние store