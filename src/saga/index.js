import { all } from "redux-saga/effects";
import { userWatcher } from "./authSaga";
import {collocutorsWatcher} from "./usersSaga";
import {profileWatcher} from "./profileSaga";
import {overWatcher} from "./overSaga";
import {friendsWatcher} from "./friendsSaga";
import {messagesWatcher} from "./messagesSaga"


export function* rootWatcher() {
    yield all([
        userWatcher(),
        collocutorsWatcher(),
        profileWatcher(),
        overWatcher(),
        friendsWatcher(),
        messagesWatcher(),
    ]);
}