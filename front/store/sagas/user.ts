import axios from 'axios';
import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';

import { UserActionType } from '../actions/userAction';

function loadUserInfoAPI(data?) {
  return axios.get(data ? `/user/${data}` : '/user');
}

function* loadMyInfo() {
  try {
    const result = yield call(loadUserInfoAPI);

    yield put({
      type: UserActionType.LOAD_MY_INFO_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UserActionType.LOAD_MY_INFO_FAILURE,
      error: err.message,
    });
  }
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserInfoAPI, action.payload.UserId);

    yield put({
      type: UserActionType.LOAD_USER_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UserActionType.LOAD_USER_FAILURE,
      error: err.message,
    });
  }
}

function logInAPI(data) {
  return axios.post('/user/login', data);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.payload);
    // logInAPI(action.data)와 같음
    // 굳이 call을 사용하는 이유? : generator는 test하기가 매우 용이함

    yield put({
      type: UserActionType.LOG_IN_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UserActionType.LOG_IN_FAILURE,
      error: err.message,
    });
  }
}

function logOutAPI() {
  return axios.post('/user/logout');
}

function* logOut() {
  try {
    yield call(logOutAPI);
    yield put({
      type: UserActionType.LOG_OUT_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UserActionType.LOG_OUT_FAILURE,
      error: err.message,
    });
  }
}

function signUpAPI(data) {
  return axios.post('/user', data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.payload);

    console.log(result);

    yield put({
      type: UserActionType.SIGN_UP_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UserActionType.SIGN_UP_FAILURE,
      error: err.message,
    });
  }
}

function followAPI(data) {
  return axios.patch(`/user/${data}/follow`);
}

function* follow(action) {
  try {
    yield call(followAPI, action.payload.id); // action.payload: { id, nickname }

    yield put({
      type: UserActionType.FOLLOW_SUCCESS,
      payload: action.payload,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UserActionType.FOLLOW_FAILURE,
      error: err.message,
    });
  }
}

function unfollowAPI(data) {
  return axios.delete(`/user/${data}/follow`);
}

function* unfollow(action) {
  try {
    yield call(unfollowAPI, action.payload.id); // action.payload: { id, nickname }

    yield put({
      type: UserActionType.UNFOLLOW_SUCCESS,
      payload: action.payload,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UserActionType.UNFOLLOW_FAILURE,
      error: err.message,
    });
  }
}

function removeFollowerAPI(data) {
  return axios.delete(`/user/${data}/follower`);
}

function* removeFollower(action) {
  try {
    yield call(removeFollowerAPI, action.payload.id); // action.payload: { id, nickname }

    yield put({
      type: UserActionType.REMOVE_FOLLOWER_SUCCESS,
      payload: action.payload,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UserActionType.REMOVE_FOLLOWER_FAILURE,
      error: err.message,
    });
  }
}

function changeNicknameAPI(data) {
  return axios.patch('/user/nickname', data);
}

function* changeNickname(action) {
  try {
    const result = yield call(changeNicknameAPI, action.payload);
    yield put({
      type: UserActionType.CHANGE_NICKNAME_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    yield put({
      type: UserActionType.CHANGE_NICKNAME_FAILURE,
      error: err.message,
    });
  }
}

// eventListener와 비슷한 역할을 함
function* watchLoadMyInfo() {
  yield takeLatest(UserActionType.LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchLoadUser() {
  yield takeLatest(UserActionType.LOAD_USER_REQUEST, loadUser);
}

function* watchLogIn() {
  yield takeLatest(UserActionType.LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(UserActionType.LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(UserActionType.SIGN_UP_REQUEST, signUp);
}

function* watchFollow() {
  yield takeLatest(UserActionType.FOLLOW_REQUEST, follow);
}

function* watchUnFollow() {
  yield takeLatest(UserActionType.UNFOLLOW_REQUEST, unfollow);
}

function* watchRemoveFollower() {
  yield takeLatest(UserActionType.REMOVE_FOLLOWER_REQUEST, removeFollower);
}

function* watchUnChangeNickname() {
  yield takeLatest(UserActionType.CHANGE_NICKNAME_REQUEST, changeNickname);
}

export default function* userSaga() {
  yield all([
    fork(watchLoadMyInfo),
    fork(watchLoadUser),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnFollow),
    fork(watchRemoveFollower),
    fork(watchUnChangeNickname),
  ]);
}
