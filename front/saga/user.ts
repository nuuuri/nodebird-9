import { all, call, delay, fork, put, takeEvery } from "redux-saga/effects";

function logInAPI(data) {
  // return axios.post("/api/login");
}

function* logIn(action) {
  try {
    yield delay(1000);
    //  const result = yield call(logInAPI, action.data);
    // logInAPI(action.data)와 같음
    // 굳이 call을 사용하는 이유? : generator는 test하기가 매우 용이함

    yield put({
      type: "LOG_IN_SUCCESS",
      // payload: result.data,
      payload: action.payload,
    });
  } catch (err) {
    yield put({
      type: "LOG_IN_FAILURE",
      payload: err.response.data,
    });
  }
}

function* logOut() {}

// eventListener와 비슷한 역할을 함
function* watchLogIn() {
  yield takeEvery("LOG_IN_REQUEST", logIn);
}

function* watchLogOut() {
  yield takeEvery("LOG_OUT_REQUEST", logOut);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut)]);
}