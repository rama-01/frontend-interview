import {put, takeEvery, all, delay} from 'redux-saga/effects'

function* helloSaga() {
    console.log('Hello Sagas!')
}

function* watchIncrementAsync() {
    yield takeEvery('INCREMENT_ASYNC', function* () {
        yield delay(1000)
        yield put({type: 'INCREMENT'})
    })
}

export default function* rootSaga() {
    yield all([helloSaga(), watchIncrementAsync()])
}
　