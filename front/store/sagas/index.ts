import { all, fork } from 'redux-saga/effects';

import postSaga from './post';
import userSaga from './user';

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]);
}

// call : 동기 함수 호출
// fork : 비동기 함수 호출

// take : 일회성으로 동작 (-> while이 필요함)
// while take : 동기적으로 동작
// takeEvery : 비동기로 동작

// takeLeading : 처리되지 않은 여러 동작들 중 첫번째 동작만 실행
// takeLatest : 처리되지 않은 여러 동작들 중 마지막 동작만 실행
// 요청은 그대로 여러 개가 가고, 응답을 취소함 (서버에서 검증 필요)

// throttle : 마지막 함수가 호출될 후 일정 시간이 지나기 전에 다시 호출되지 않도록 하는 것
// debounce : 연이어 호출되는 함수들 중 마지막 함수(또는 제일 처음)만 호출하도록 하는 것

/* 
  while (true) {
    yield take("LOG_IN_REQUEST", logIn);
  }
*/
