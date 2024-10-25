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

function loadPostsAPI(data) {
  return axios.get(`/posts?lastId=${data || 0}`);
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.payload.lastId);

    yield put({
      type: PostActionType.LOAD_POST_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    console.error(err);
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
    console.error(err);
    yield put({
      type: PostActionType.ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function addCommentAPI(data) {
  return axios.post(`/post/${data.PostId}/comment`, data);
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.payload);

    yield put({
      type: PostActionType.ADD_COMMENT_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PostActionType.ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function removePostAPI(data) {
  return axios.delete(`/post/${data.PostId}`);
}

function* removePost(action) {
  try {
    yield call(removePostAPI, action.payload);

    yield put({
      type: PostActionType.REMOVE_POST_SUCCESS,
      payload: action.payload,
    });
    yield put({
      type: UserActionType.REMOVE_POST_OF_ME,
      payload: action.payload,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PostActionType.REMOVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function likePostAPI(data) {
  return axios.patch(`/post/${data.PostId}/like`);
}

function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.payload);
    yield put({
      type: PostActionType.LIKE_POST_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PostActionType.LIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function unlikePostAPI(data) {
  return axios.delete(`/post/${data.PostId}/like`);
}

function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.payload);
    yield put({
      type: PostActionType.UNLIKE_POST_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PostActionType.UNLIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function uploadImagesAPI(data) {
  return axios.post('/post/images', data);
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.payload);
    yield put({
      type: PostActionType.UPLOAD_IMAGES_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PostActionType.UPLOAD_IMAGES_FAILURE,
      error: err.response.data,
    });
  }
}

function retweetPostAPI(data) {
  return axios.post(`/post/${data}/retweet`);
}

function* retweetPost(action) {
  try {
    const result = yield call(retweetPostAPI, action.payload.PostId);
    yield put({
      type: PostActionType.RETWEET_POST_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PostActionType.RETWEET_POST_FAILURE,
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

function* watchLikePost() {
  yield takeLatest(PostActionType.LIKE_POST_REQUEST, likePost);
}

function* watchUnlikePost() {
  yield takeLatest(PostActionType.UNLIKE_POST_REQUEST, unlikePost);
}

function* watchUploadImages() {
  yield takeLatest(PostActionType.UPLOAD_IMAGES_REQUEST, uploadImages);
}

function* watchRetweetPost() {
  yield takeLatest(PostActionType.RETWEET_POST_REQUEST, retweetPost);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchUploadImages),
    fork(watchRetweetPost),
  ]);
}
