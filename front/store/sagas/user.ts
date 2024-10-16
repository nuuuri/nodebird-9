import { all, call, delay, fork, put, takeEvery } from 'redux-saga/effects';

import { UserActionType } from '../actions/userAction';

function logInAPI(data) {
  // return axios.post("/api/login");

  return {
    data: { nickname: 'nuuuri', Posts: [], Followings: [], Followers: [] },
  };
}

function* logIn(action) {
  try {
    yield delay(1000);
    const result = yield call(logInAPI, action.data);
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

// eventListener와 비슷한 역할을 함
function* watchLogIn() {
  yield takeEvery(UserActionType.LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeEvery(UserActionType.LOG_OUT_REQUEST, logOut);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut)]);
}
