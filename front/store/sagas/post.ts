import { all, call, delay, fork, put, takeEvery } from "redux-saga/effects";

import { PostActionType } from "../actions/postAction";

function* addPost(action) {
  try {
    yield delay(1000);
    //  const result = yield call(logInAPI, action.data);
    // logInAPI(action.data)와 같음
    // 굳이 call을 사용하는 이유? : generator는 test하기가 매우 용이함

    yield put({
      type: PostActionType.ADD_POST_SUCCESS,
      // payload: result.data,
      payload: action.payload,
    });
  } catch (err) {
    yield put({
      type: PostActionType.ADD_POST_FAILURE,
      payload: err.response.data,
    });
  }
}

function* addComment(action) {
  try {
    yield delay(1000);
    //  const result = yield call(logInAPI, action.data);
    // logInAPI(action.data)와 같음
    // 굳이 call을 사용하는 이유? : generator는 test하기가 매우 용이함

    yield put({
      type: PostActionType.ADD_COMMENT_SUCCESS,
      // payload: result.data,
      payload: action.payload,
    });
  } catch (err) {
    yield put({
      type: PostActionType.ADD_COMMENT_FAILURE,
      payload: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeEvery(PostActionType.ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
  yield takeEvery(PostActionType.ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment)]);
}
