import {put, takeEvery} from 'redux-saga/effects'
import {
    ASYNC_SET_SHOW_MESSAGE,
    setShowMessageAction
} from "../store/overReducer";

const delay = (ms) => new Promise(res => setTimeout(res, ms))

function* getMassageWorker({payload}) {
    yield put(setShowMessageAction({payload}))
    // yield delay(2000)
    // yield put(setShowMessageAction(''))
}
// function* deleteShowMessageWorker({payload}) {
//     yield put(deleteShowMessageAction())
// }


export function* overWatcher() {
    yield takeEvery(ASYNC_SET_SHOW_MESSAGE, getMassageWorker)
    //yield takeEvery(ASYNC_DELETE_MESSAGE, deleteShowMessageWorker)
}