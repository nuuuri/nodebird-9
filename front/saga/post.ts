import { all, call, fork, put, takeEvery } from "redux-saga/effects";

function* addPost() {}

function* watchAddPost() {
  yield takeEvery("ADD_POST_REQUEST", addPost);
}
export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}
