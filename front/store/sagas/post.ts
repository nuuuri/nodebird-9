import {
  all,
  call,
  delay,
  fork,
  put,
  takeEvery,
  takeLatest,
  throttle,
} from 'redux-saga/effects';
import shortId from 'shortid';

import { PostActionType } from '../actions/postAction';
import { UserActionType } from '../actions/userAction';
import { generateDummyPost } from '../reducers/postReducer';

function loadPostsAPI(data) {
  return [];
}

function* loadPosts(action) {
  try {
    yield delay(1000);

    yield put({
      type: PostActionType.LOAD_POST_SUCCESS,
      payload: generateDummyPost(10),
    });
  } catch (err) {
    yield put({
      type: PostActionType.LOAD_POST_FAILURE,
      payload: err.response.data,
    });
  }
}

function* addPost(action) {
  try {
    yield delay(1000);
    //  const result = yield call(logInAPI, action.data);
    // logInAPI(action.data)와 같음
    // 굳이 call을 사용하는 이유? : generator는 test하기가 매우 용이함

    const id = shortId.generate();
    yield put({
      type: PostActionType.ADD_POST_SUCCESS,
      // payload: result.data,
      payload: { id, ...action.payload },
    });
    yield put({
      type: UserActionType.ADD_POST_TO_ME,
      payload: { id, ...action.payload },
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

    const id = shortId.generate();

    yield put({
      type: PostActionType.ADD_COMMENT_SUCCESS,
      // payload: result.data,
      payload: { id, ...action.payload },
    });
  } catch (err) {
    yield put({
      type: PostActionType.ADD_COMMENT_FAILURE,
      payload: err.response.data,
    });
  }
}

function* removePost(action) {
  try {
    yield delay(1000);

    yield put({
      type: PostActionType.REMOVE_POST_SUCCESS,
      payload: action.payload,
    });
    yield put({
      type: UserActionType.REMOVE_POST_OF_ME,
      payload: action.payload,
    });
  } catch (err) {
    yield put({
      type: PostActionType.REMOVE_POST_FAILURE,
      payload: err.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield throttle(5000, PostActionType.LOAD_POST_REQUEST, loadPosts);
}

function* watchAddPost() {
  yield takeLatest(PostActionType.ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
  yield takeLatest(PostActionType.REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  yield takeLatest(PostActionType.ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
  ]);
}
