import axios from 'axios';
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

function loadPostsAPI() {
  return axios.get('/posts');
}

function* loadPosts() {
  try {
    const result = yield call(loadPostsAPI);

    yield put({
      type: PostActionType.LOAD_POST_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    yield put({
      type: PostActionType.LOAD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post('/post', data);
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.payload);

    yield put({
      type: PostActionType.ADD_POST_SUCCESS,
      payload: result.data,
    });
    yield put({
      type: UserActionType.ADD_POST_TO_ME,
      payload: result.data,
    });
  } catch (err) {
    yield put({
      type: PostActionType.ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.payload);

    yield put({
      type: PostActionType.ADD_COMMENT_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: PostActionType.ADD_COMMENT_FAILURE,
      error: err.response.data,
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
      error: err.response.data,
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
