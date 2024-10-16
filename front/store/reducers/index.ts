import { HYDRATE } from 'next-redux-wrapper';

import { combineReducers } from 'redux';

import postReducer from './postReducer';
import userReducer from './userReducer';

export const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE: // 서버에서 생성한 상태를 클라이언트 store에 합쳐준다.
      return { ...state, ...action.payload };
    default:
      return combineReducers({
        user: userReducer,
        post: postReducer,
      })(state, action);
  }
};

export type RootState = ReturnType<typeof rootReducer>;
