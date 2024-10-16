import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';

import { UserActionType } from '../actions/userAction';

function logInAPI(data) {
  return {
    data: {
      ...data,
      nickname: 'nuuuri',
      Posts: [],
      Followings: [],
      Followers: [],
    },
  };
}

function* logIn(action) {
  try {
    yield delay(1000);
    const result = yield call(logInAPI, action.payload);
    // logInAPI(action.data)와 같음
    // 굳이 call을 사용하는 이유? : generator는 test하기가 매우 용이함

    yield put({
      type: UserActionType.LOG_IN_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    yield put({
      type: UserActionType.LOG_IN_FAILURE,
      payload: err.response.data,
    });
  }
}

function* logOut() {}

function* follow(action) {
  try {
    yield delay(1000);

    yield put({
      type: UserActionType.FOLLOW_SUCCESS,
      payload: action.payload,
    });
  } catch (err) {
    yield put({
      type: UserActionType.FOLLOW_FAILURE,
      payload: err.response.data,
    });
  }
}

function* unfollow(action) {
  try {
    yield delay(1000);

    yield put({
      type: UserActionType.UNFOLLOW_SUCCESS,
      payload: action.payload,
    });
  } catch (err) {
    yield put({
      type: UserActionType.UNFOLLOW_FAILURE,
      payload: err.response.data,
    });
  }
}

// eventListener와 비슷한 역할을 함
function* watchLogIn() {
  yield takeLatest(UserActionType.LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(UserActionType.LOG_OUT_REQUEST, logOut);
}

function* watchFollow() {
  yield takeLatest(UserActionType.FOLLOW_REQUEST, follow);
}

function* watchUnFollow() {
  yield takeLatest(UserActionType.UNFOLLOW_REQUEST, unfollow);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchFollow),
    fork(watchUnFollow),
  ]);
}
